package se.foreningsdialog.forening.payload;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.Organization;

import java.util.List;

@Getter
@Setter
public class AssociationResponse {
private Long id;
private List<OrganizationResponse> organizations;
private UserSummary createdBy;

}
