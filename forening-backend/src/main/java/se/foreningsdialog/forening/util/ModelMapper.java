package se.foreningsdialog.forening.util;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.payload.OrganizationResponse;
import se.foreningsdialog.forening.payload.UserSummary;

import java.util.List;
import java.util.stream.Collectors;

public class ModelMapper {

    public static OrganizationResponse mapOrganizationResponse(Organization organization, User creator) {
        System.out.println("mapper");
        OrganizationResponse organizationResponse = new OrganizationResponse();
        organizationResponse.setId(organization.getId());
        organizationResponse.setTotalArea(organization.getTotalArea());
        organizationResponse.setOrgNumber(organization.getOrgNumber());
        organizationResponse.setNumberOfApartments(organization.getNumberOfApartments());
        List<GrantedAuthority> authorities = creator.getRoles().stream().map(role ->
                new SimpleGrantedAuthority(role.getName().name())
        ).collect(Collectors.toList());
        organizationResponse.setAssociations(organization.getAssociations());
        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(),authorities);
        organizationResponse.setCreatedBy(creatorSummary);
        return organizationResponse;
    }

}
