package se.foreningsdialog.forening.payload;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.Document;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
public class DocumentTypeResponse {

    private Long id;

    private String typeName;


    private List<Document> documents;


    private AssociationName associationName;
}
