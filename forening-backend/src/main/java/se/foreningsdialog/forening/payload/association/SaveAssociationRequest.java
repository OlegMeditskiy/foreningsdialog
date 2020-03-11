package se.foreningsdialog.forening.payload.association;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.Association;
import se.foreningsdialog.forening.models.AssociationName;

@Getter
@Setter
public class SaveAssociationRequest {
    AssociationName association;
    private String associationName;

}
