package se.foreningsdialog.forening.controllers;

import se.foreningsdialog.forening.exception.AppException;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.ContactPerson;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.models.users.Admin;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.models.users.constants.Role;
import se.foreningsdialog.forening.models.users.constants.RoleName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.payload.common.JwtAuthenticationResponse;
import se.foreningsdialog.forening.payload.common.LoginRequest;
import se.foreningsdialog.forening.payload.common.SignUpRequest;
import se.foreningsdialog.forening.repository.*;
import se.foreningsdialog.forening.security.JwtTokenProvider;

import javax.validation.Valid;
import java.net.URI;
import java.util.LinkedHashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;





    @Autowired
    OrganizationRepository organizationRepository;

    @Autowired
    HouseRepository houseRepository;

    @Autowired
    AssociationNameRepository associationNameRepository;

    @Autowired
    ContactPersonRepository contactPersonRepository;


    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        System.out.println("LOGIN");
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

    @PostMapping("/signup/main")
    public ResponseEntity<?> registerMainAdmin(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }



        // Creating user's account
        Admin user = new Admin(signUpRequest.getUsername(), signUpRequest.getPassword());
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
//        return ResponseEntity.ok().body("Created");
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        System.out.println("sign up");
        if(userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
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
        for (Organization organization: signUpRequest.getAssociation().getOrganizations()){
            organization.setCreatedBy(user.getId());
            organizationRepository.save(organization);
            for(AssociationName associationName: organization.getAssociations()){
                associationName.setOrganization(organization);
                associationName.setCreatedBy(user.getId());
                associationNameRepository.save(associationName);
                for (ContactPerson contactPerson: associationName.getContacts()){
                    contactPerson.setAssociationName(associationName);
                    contactPerson.setCreatedBy(user.getId());
                    contactPersonRepository.save(contactPerson);
                }
                for (House house:associationName.getHouses()){
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
