package se.foreningsdialog.forening.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import se.foreningsdialog.forening.exception.ResourceNotFoundException;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.payload.apartment.ApartmentResponse;
import se.foreningsdialog.forening.payload.association.AssociationNameResponse;
import se.foreningsdialog.forening.payload.common.UserIdentityAvailability;
import se.foreningsdialog.forening.payload.common.UserProfile;
import se.foreningsdialog.forening.payload.common.UserSummary;
import se.foreningsdialog.forening.payload.house.HouseResponse;
import se.foreningsdialog.forening.payload.organization.OrganizationResponse;
import se.foreningsdialog.forening.repository.UserRepository;
import se.foreningsdialog.forening.security.CurrentUser;
import se.foreningsdialog.forening.security.UserPrincipal;
import se.foreningsdialog.forening.service.ApartmentService;
import se.foreningsdialog.forening.service.AssociationService;
import se.foreningsdialog.forening.service.HouseService;
import se.foreningsdialog.forening.service.OrganizationService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;
    private final OrganizationService organizationService;
    private final AssociationService associationService;
    private final HouseService houseService;
    private final ApartmentService apartmentService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserRepository userRepository, OrganizationService organizationService, AssociationService associationService, HouseService houseService, ApartmentService apartmentService) {
        this.userRepository = userRepository;
        this.organizationService = organizationService;
        this.associationService = associationService;
        this.houseService = houseService;
        this.apartmentService = apartmentService;
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getAuthorities());
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return new UserProfile(user.getId(), user.getUsername(), user.getCreatedAt());
    }

    @GetMapping("/users/{username}/organizations")
    public List<OrganizationResponse> getOrganizationsCreatedBy(@PathVariable(value = "username") String username) {

        return organizationService.getAllOrganizationsCreatedBy(username);
    }

    @GetMapping("/users/{username}/organization/{organisationId}")
    public OrganizationResponse getOrganization(@PathVariable(value = "username") String username, @PathVariable(value = "organisationId") Long organisationId) {
        return organizationService.getOrganizationCreatedBy(username, organisationId);
    }

    @GetMapping("/users/{username}/association/{associationId}")
    public AssociationNameResponse getAssociation(@PathVariable(value = "username") String username, @PathVariable(value = "associationId") Long associationId) {
        return associationService.getAssociationCreatedBy(username, associationId);
    }

    @GetMapping("/users/{username}/house/{houseId}")
    public HouseResponse getHouse(@PathVariable(value = "username") String username, @PathVariable(value = "houseId") Long houseId) {
        return houseService.getHouseCreatedBy(username, houseId);
    }

    @GetMapping("/users/{username}/apartment/{apartmentId}")
    public ApartmentResponse getApartment(@PathVariable(value = "username") String username, @PathVariable(value = "apartmentId") Long apartmentId) {
        return apartmentService.getApartmentCreatedBy(username, apartmentId);
    }


}
