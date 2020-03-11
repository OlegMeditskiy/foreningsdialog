package se.foreningsdialog.forening.payload.association;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.Organization;

@Getter
@Setter
public class DeleteAssociationRequest {
    AssociationName association;
    Long organizationId;
}
