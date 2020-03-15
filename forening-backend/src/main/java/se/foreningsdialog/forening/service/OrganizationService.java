package se.foreningsdialog.forening.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.exception.BadRequestException;
import se.foreningsdialog.forening.exception.ResourceNotFoundException;
import se.foreningsdialog.forening.models.Association;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.payload.organization.OrganizationResponse;
import se.foreningsdialog.forening.payload.common.UserSummary;
import se.foreningsdialog.forening.repository.OrganizationRepository;
import se.foreningsdialog.forening.repository.UserRepository;
import se.foreningsdialog.forening.util.AppConstants;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class OrganizationService {
    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    UserRepository userRepository;


    public List<OrganizationResponse> getAllOrganizationsCreatedBy(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        List<Organization> organizations = organizationRepository.findByCreatedBy(user.getId());
        List<OrganizationResponse> organizationResponses=new ArrayList<>();
        for (Organization organization: organizations){
            OrganizationResponse organizationResponse = new OrganizationResponse();
            organizationResponse.setId(organization.getId());
            organizationResponse.setTotalArea(organization.getTotalArea());
            organizationResponse.setOrgNumber(organization.getOrgNumber());
            organizationResponse.setNumberOfApartments(organization.getNumberOfApartments());
            organizationResponse.setActivated(organization.isActivated());
            List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
                    new SimpleGrantedAuthority(role.getName().name())
            ).collect(Collectors.toList());
            System.out.println("set associations");
            try{
                organizationResponse.setAssociations(organization.getAssociations());
            }catch (Exception ex){
                System.out.println(ex);
            }
            UserSummary creatorSummary = new UserSummary(user.getId(), user.getUsername(),authorities);
            organizationResponse.setCreatedBy(creatorSummary);
            organizationResponses.add(organizationResponse);
        }
        return organizationResponses;
    }

    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
    Map<Long, User> getPollCreatorMap(List<Association> associations) {
        List<Long> creatorIds = associations.stream()
                .map(Association::getCreatedBy)
                .distinct()
                .collect(Collectors.toList());

        List<User> creators = userRepository.findByIdIn(creatorIds);
        Map<Long, User> creatorMap = creators.stream()
                .collect(Collectors.toMap(User::getId, Function.identity()));

        return creatorMap;
    }
}
