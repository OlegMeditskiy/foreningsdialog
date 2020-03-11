package se.foreningsdialog.forening.payload.association;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewAssociationRequest {
    private Long userId;
    private Long organizationId;
    private String associationName;
}
