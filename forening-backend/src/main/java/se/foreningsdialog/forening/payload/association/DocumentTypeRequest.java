package se.foreningsdialog.forening.payload.association;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DocumentTypeRequest {
    private String typeName;
    private Long associationNameId;
}
