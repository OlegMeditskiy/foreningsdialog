package se.foreningsdialog.forening.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import se.foreningsdialog.forening.exception.AppException;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.ContactPerson;
import se.foreningsdialog.forening.models.GuestRegister;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.models.loanobjects.*;
import se.foreningsdialog.forening.models.users.Admin;
import se.foreningsdialog.forening.models.users.GuestUser;
import se.foreningsdialog.forening.models.users.MainAdmin;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.models.users.constants.Role;
import se.foreningsdialog.forening.models.users.constants.RoleName;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.payload.common.JwtAuthenticationResponse;
import se.foreningsdialog.forening.payload.common.LoginRequest;
import se.foreningsdialog.forening.payload.common.SignUpRequest;
import se.foreningsdialog.forening.payload.guestRegister.GuestRegisterRequest;
import se.foreningsdialog.forening.repository.*;
import se.foreningsdialog.forening.repository.loanObjects.*;
import se.foreningsdialog.forening.security.JwtTokenProvider;
import se.foreningsdialog.forening.storage.StorageService;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.net.URI;
import java.util.LinkedHashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    final
    AuthenticationManager authenticationManager;

    final
    UserRepository userRepository;

    final
    RoleRepository roleRepository;

    final
    OrganizationRepository organizationRepository;

    final
    HouseRepository houseRepository;
    final StorageService storageService;

    final
    AssociationNameRepository associationNameRepository;

    final
    ContactPersonRepository contactPersonRepository;


    final
    PasswordEncoder passwordEncoder;

    final
    JwtTokenProvider tokenProvider;

    final
    ExternLokalRepository externLokalRepository;

    final
    GuestFlatRepository guestFlatRepository;

    final
    LaundryRepository laundryRepository;

    final
    ParkingRepository parkingRepository;

    final
    PartyPlaceRepository partyPlaceRepository;

    final
    PoolRepository poolRepository;
    final
    GuestRegisterRepository guestRegisterRepository;

    public AuthController(UserRepository userRepository, AuthenticationManager authenticationManager, RoleRepository roleRepository, PartyPlaceRepository partyPlaceRepository, OrganizationRepository organizationRepository, LaundryRepository laundryRepository, HouseRepository houseRepository, StorageService storageService, AssociationNameRepository associationNameRepository, ContactPersonRepository contactPersonRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider, PoolRepository poolRepository, ExternLokalRepository externLokalRepository, ParkingRepository parkingRepository, GuestFlatRepository guestFlatRepository, GuestRegisterRepository guestRegisterRepository) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
        this.partyPlaceRepository = partyPlaceRepository;
        this.organizationRepository = organizationRepository;
        this.laundryRepository = laundryRepository;
        this.houseRepository = houseRepository;
        this.storageService = storageService;
        this.associationNameRepository = associationNameRepository;
        this.contactPersonRepository = contactPersonRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.poolRepository = poolRepository;
        this.externLokalRepository = externLokalRepository;
        this.parkingRepository = parkingRepository;
        this.guestFlatRepository = guestFlatRepository;
        this.guestRegisterRepository = guestRegisterRepository;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }


    @PostMapping("/signupGuest")
    public ResponseEntity<?> registerGuest(@Valid @RequestBody GuestRegisterRequest guestRegisterRequest) {
        if (userRepository.existsByUsername(guestRegisterRequest.getUsername())) {
            return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
        // Creating user's account
        GuestUser user = new GuestUser(guestRegisterRequest.getUsername(), guestRegisterRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Set<Role> roles = new LinkedHashSet<>();
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));
        roles.add(userRole);
        userRole = roleRepository.findByName(RoleName.ROLE_GUEST)
                .orElseThrow(() -> new AppException("User Role not set."));
        roles.add(userRole);
        user.setRoles(roles);


        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        GuestRegister guestRegister = guestRegisterRepository.findByUniqueKey(guestRegisterRequest.getUniqueKey());
        guestRegister.setActivated(true);
        guestRegisterRepository.save(guestRegister);

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
//        return ResponseEntity.ok().body("Created");
    }

    @PostMapping("/createMainAdmin")
    public ResponseEntity<?> registerMainAdmin(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        MainAdmin user = new MainAdmin(signUpRequest.getUsername(), signUpRequest.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Set<Role> roles = new LinkedHashSet<>();
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));
        roles.add(userRole);
        userRole = roleRepository.findByName(RoleName.ROLE_MAIN_ADMIN)
                .orElseThrow(() -> new AppException("User Role not set."));
        roles.add(userRole);
        user.setRoles(roles);


        User result = userRepository.save(user);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }


    @PostMapping(value = "/signup",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerUser(@RequestPart("file") @Valid @NotNull @NotBlank @RequestParam MultipartFile file,
                                          @RequestPart ("properties") @Valid SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        Admin user = new Admin(signUpRequest.getUsername(), signUpRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Set<Role> roles = new LinkedHashSet<>();
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));
        roles.add(userRole);
        userRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new AppException("User Role not set."));
        roles.add(userRole);
        user.setRoles(roles);


        User result = userRepository.save(user);

        //Creating new Organizations
        for (Organization organization : signUpRequest.getAssociation().getOrganizations()) {
            organization.setCreatedBy(user.getId());
            organizationRepository.save(organization);
            String filename = "organisation_"+organization.getId()+"_ÅrsProtokoll";
            storageService.saveAs(file,filename);

            ExternLokalSettings externLokal = new ExternLokalSettings();
            externLokal.setLoanType();
            externLokal.setOrganization(organization);
            externLokalRepository.save(externLokal);

            GuestFlatSettings guestFlatSettings = new GuestFlatSettings();
            guestFlatSettings.setOrganization(organization);
            guestFlatSettings.setLoanType();
            guestFlatRepository.save(guestFlatSettings);

            LaundrySettings laundrySettings = new LaundrySettings();
            laundrySettings.setOrganization(organization);
            laundrySettings.setLoanType();
            laundryRepository.save(laundrySettings);

            ParkingSettings parkingSettings = new ParkingSettings();
            parkingSettings.setOrganization(organization);
            parkingSettings.setLoanType();
            parkingRepository.save(parkingSettings);

            PartyPlaceSettings partyPlaceSettings = new PartyPlaceSettings();
            partyPlaceSettings.setOrganization(organization);
            partyPlaceSettings.setLoanType();
            partyPlaceRepository.save(partyPlaceSettings);

            PoolSettings poolSettings = new PoolSettings();
            poolSettings.setOrganization(organization);
            poolSettings.setLoanType();
            poolRepository.save(poolSettings);

            for (AssociationName associationName : organization.getAssociations()) {
                associationName.setOrganization(organization);
                associationName.setCreatedBy(user.getId());
                associationNameRepository.save(associationName);
                for (ContactPerson contactPerson : associationName.getContacts()) {
                    contactPerson.setAssociationName(associationName);
                    contactPerson.setCreatedBy(user.getId());
                    contactPersonRepository.save(contactPerson);
                }
                for (House house : associationName.getHouses()) {
                    house.setAssociationName(associationName);
                    house.setCreatedBy(user.getId());
                    houseRepository.save(house);
                }
            }
        }


        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
//        return ResponseEntity.ok().body("Created");
    }
}
