package se.foreningsdialog.forening.controllers;

import org.springframework.web.bind.annotation.*;
import se.foreningsdialog.forening.exception.ResourceNotFoundException;
import se.foreningsdialog.forening.models.users.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import se.foreningsdialog.forening.payload.common.UserIdentityAvailability;
import se.foreningsdialog.forening.payload.common.UserProfile;
import se.foreningsdialog.forening.payload.common.UserSummary;
import se.foreningsdialog.forening.payload.organization.OrganizationResponse;
import se.foreningsdialog.forening.repository.UserRepository;
import se.foreningsdialog.forening.security.CurrentUser;
import se.foreningsdialog.forening.security.UserPrincipal;
import se.foreningsdialog.forening.service.OrganizationService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {



    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrganizationService organizationService;


    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getAuthorities());
        return userSummary;
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

        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getCreatedAt());

        return userProfile;
    }

//    @GetMapping("/users/{username}/organizations1")
//    public PagedResponse<OrganizationResponse> getOrganizationsCreatedBy1(@PathVariable(value = "username") String username,
//                                                                       @CurrentUser UserPrincipal currentUser,
//                                                                       @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
//                                                                       @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
//        return organizationService.getOrganizationsCreatedBy(username, currentUser, page, size);
//    }
    @GetMapping("/users/{username}/organizations")
    public List<OrganizationResponse> getOrganizationsCreatedBy(@PathVariable(value = "username") String username) {

        return organizationService.getAllOrganizationsCreatedBy(username);
    }

//    @GetMapping("/user/checkEmailAvailability")
//    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
//        Boolean isAvailable = !userRepository.existsByEmail(email);
//        return new UserIdentityAvailability(isAvailable);
//    }



}
