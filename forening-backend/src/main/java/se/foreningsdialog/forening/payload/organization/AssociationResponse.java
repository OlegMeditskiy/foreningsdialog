package se.foreningsdialog.forening.payload.organization;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.payload.common.UserSummary;

import java.util.List;

@Getter
@Setter
public class AssociationResponse {
    private Long id;
    private List<OrganizationResponse> organizations;
    private UserSummary createdBy;

}
