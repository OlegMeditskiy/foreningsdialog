package se.foreningsdialog.forening.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.exception.ResourceNotFoundException;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.payload.common.UserSummary;
import se.foreningsdialog.forening.payload.organization.OrganizationResponse;
import se.foreningsdialog.forening.repository.OrganizationRepository;
import se.foreningsdialog.forening.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrganizationService {
    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    UserRepository userRepository;


    public List<OrganizationResponse> getAllOrganizationsCreatedBy(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        List<Organization> organizations = organizationRepository.findByCreatedBy(user.getId());
        List<OrganizationResponse> organizationResponses = new ArrayList<>();
        for (Organization organization : organizations) {
            OrganizationResponse organizationResponse = new OrganizationResponse();
            organizationResponse.setId(organization.getId());
            organizationResponse.setTotalArea(organization.getTotalArea());
            organizationResponse.setOrgNumber(organization.getOrgNumber());
            organizationResponse.setNumberOfApartments(organization.getNumberOfApartments());
            organizationResponse.setActivated(organization.isActivated());
            organizationResponse.setDeclined(organization.isDeclined());
            List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
                    new SimpleGrantedAuthority(role.getName().name())
            ).collect(Collectors.toList());
            try {
                organizationResponse.setAssociations(organization.getAssociations());
            } catch (Exception ex) {
                System.out.println(ex);
            }
            UserSummary creatorSummary = new UserSummary(user.getId(), user.getUsername(), authorities);
            organizationResponse.setCreatedBy(creatorSummary);
            organizationResponses.add(organizationResponse);
        }
        return organizationResponses;
    }

    public List<OrganizationResponse> getAllOrganizations() {
        List<Organization> organizations = organizationRepository.findAll();
        List<OrganizationResponse> organizationResponses = new ArrayList<>();
        for (Organization organization : organizations) {
            OrganizationResponse organizationResponse = new OrganizationResponse();
            organizationResponse.setId(organization.getId());
            organizationResponse.setTotalArea(organization.getTotalArea());
            organizationResponse.setOrgNumber(organization.getOrgNumber());
            organizationResponse.setNumberOfApartments(organization.getNumberOfApartments());
            organizationResponse.setActivated(organization.isActivated());
            organizationResponse.setDeclined(organization.isDeclined());
            try {
                organizationResponse.setAssociations(organization.getAssociations());
            } catch (Exception ex) {
                System.out.println(ex);
            }
            organizationResponses.add(organizationResponse);
        }
        return organizationResponses;
    }


    public OrganizationResponse getOrganizationCreatedBy(String username, Long organizationId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        Organization organization = organizationRepository.findById(organizationId).get();
        OrganizationResponse organizationResponse = new OrganizationResponse();
        if (organization.getCreatedBy().equals(user.getId())) {
            organizationResponse.setId(organization.getId());
            organizationResponse.setTotalArea(organization.getTotalArea());
            organizationResponse.setOrgNumber(organization.getOrgNumber());
            organizationResponse.setNumberOfApartments(organization.getNumberOfApartments());
            organizationResponse.setActivated(organization.isActivated());
            organizationResponse.setDeclined(organization.isDeclined());
            List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
                    new SimpleGrantedAuthority(role.getName().name())
            ).collect(Collectors.toList());
            try {
                organizationResponse.setAssociations(organization.getAssociations());
                organizationResponse.setLoanObjects(organization.getLoanObjects());
            } catch (Exception ex) {
                System.out.println(ex);
            }
        }
        return organizationResponse;
    }


}
