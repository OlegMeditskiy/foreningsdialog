package se.foreningsdialog.forening.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.users.audit.UserDateAudit;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class DocumentType extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String typeName;

    @OneToMany(mappedBy = "documentType", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Document> documents;

    @ManyToOne
    @JoinTable(name = "associations_document_type", joinColumns = @JoinColumn(name = "document_type_id"), inverseJoinColumns = @JoinColumn(name = "association_id"))
    @JsonBackReference
    private AssociationName associationName;
}
