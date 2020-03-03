package se.foreningsdialog.forening.util;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import se.foreningsdialog.forening.models.Association;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.payload.AssociationResponse;
import se.foreningsdialog.forening.payload.OrganizationResponse;
import se.foreningsdialog.forening.payload.UserSummary;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ModelMapper {

    public static AssociationResponse mapPollToPollResponse(Association association,User creator) {
        AssociationResponse associationResponse = new AssociationResponse();
        associationResponse.setId(association.getId());
        System.out.println(creator);
        List<GrantedAuthority> authorities = creator.getRoles().stream().map(role ->
                new SimpleGrantedAuthority(role.getName().name())
        ).collect(Collectors.toList());
        List<OrganizationResponse> organizationResponses = association.getOrganizations().stream().map(organization -> {
            OrganizationResponse organizationResponse = new OrganizationResponse();
            organizationResponse.setId(organization.getId());
            organizationResponse.setOrgNumber(organization.getOrgNumber());
            organizationResponse.setNumberOfApartments(organization.getNumberOfApartments());
            organizationResponse.setActivated(organization.isActivated());
            organizationResponse.setTotalArea(organization.getTotalArea());
            organizationResponse.setAssociations(organization.getAssociations());
            return organizationResponse;
        }).collect(Collectors.toList());

        associationResponse.setOrganizations(organizationResponses);
        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(),authorities);
        associationResponse.setCreatedBy(creatorSummary);


        return associationResponse;
    }

}
