package se.foreningsdialog.forening.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import se.foreningsdialog.forening.exception.AppException;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.ContactPerson;
import se.foreningsdialog.forening.models.GuestRegister;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.houses.Guest;
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

import java.net.URI;
import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class AuthService {
    private final
    AuthenticationManager authenticationManager;

    private final
    UserRepository userRepository;

    private final
    RoleRepository roleRepository;

    private final
    OrganizationRepository organizationRepository;

    private final
    HouseRepository houseRepository;
    private final StorageService storageService;

    private final
    AssociationNameRepository associationNameRepository;

    private final
    ContactPersonRepository contactPersonRepository;


    private final
    PasswordEncoder passwordEncoder;

    private final
    JwtTokenProvider tokenProvider;

    private final
    ExternLokalRepository externLokalRepository;

    private final
    GuestFlatRepository guestFlatRepository;

    private final
    LaundryRepository laundryRepository;

    private final
    ParkingRepository parkingRepository;

    private final
    PartyPlaceRepository partyPlaceRepository;

    private final
    PoolRepository poolRepository;
    private final
    GuestRegisterRepository guestRegisterRepository;
    private final
    GuestRepository guestRepository;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, OrganizationRepository organizationRepository, HouseRepository houseRepository, StorageService storageService, AssociationNameRepository associationNameRepository, ContactPersonRepository contactPersonRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider, ExternLokalRepository externLokalRepository, GuestFlatRepository guestFlatRepository, LaundryRepository laundryRepository, ParkingRepository parkingRepository, PartyPlaceRepository partyPlaceRepository, PoolRepository poolRepository, GuestRegisterRepository guestRegisterRepository, GuestRepository guestRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.organizationRepository = organizationRepository;
        this.houseRepository = houseRepository;
        this.storageService = storageService;
        this.associationNameRepository = associationNameRepository;
        this.contactPersonRepository = contactPersonRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.externLokalRepository = externLokalRepository;
        this.guestFlatRepository = guestFlatRepository;
        this.laundryRepository = laundryRepository;
        this.parkingRepository = parkingRepository;
        this.partyPlaceRepository = partyPlaceRepository;
        this.poolRepository = poolRepository;
        this.guestRegisterRepository = guestRegisterRepository;
        this.guestRepository = guestRepository;
    }
    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
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
    public ResponseEntity<?> registerGuest(GuestRegisterRequest guestRegisterRequest) {
        if (userRepository.existsByUsername(guestRegisterRequest.getUsername())) {
            return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        GuestUser user = new GuestUser(guestRegisterRequest.getUsername(), guestRegisterRequest.getPassword());
        Guest guest = guestRepository.getOne(guestRegisterRequest.getGuestId());
        guest.setName(guestRegisterRequest.getName());
        guestRepository.save(guest);
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
    }
    public ResponseEntity<?> registerMainAdmin(SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }


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
    public ResponseEntity<?> registerUser(MultipartFile file, SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }


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


        for (Organization organization : signUpRequest.getAssociation().getOrganizations()) {
            organization.setCreatedBy(user.getId());
            organizationRepository.save(organization);
            String filename = "organisation_"+organization.getId()+"_ArsProtokoll";
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
    }
}
