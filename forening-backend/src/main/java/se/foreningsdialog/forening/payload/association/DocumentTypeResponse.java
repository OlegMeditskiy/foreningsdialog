package se.foreningsdialog.forening.payload.association;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.Document;

import java.util.List;

@Getter
@Setter
public class DocumentTypeResponse {

    private Long id;

    private String typeName;

    private List<Document> documents;

    private AssociationName associationName;
}
