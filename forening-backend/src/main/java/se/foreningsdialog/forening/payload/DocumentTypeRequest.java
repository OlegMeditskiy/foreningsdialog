package se.foreningsdialog.forening.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DocumentTypeRequest {
    private String typeName;
    private Long associationNameId;
}
