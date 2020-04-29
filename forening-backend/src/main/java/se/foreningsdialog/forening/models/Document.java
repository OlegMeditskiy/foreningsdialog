package se.foreningsdialog.forening.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    @ManyToOne
    @JoinTable(name = "document_type_documents",joinColumns = @JoinColumn(name = "document_id"),inverseJoinColumns = @JoinColumn(name = "document_type_id"))
    @JsonBackReference
    private DocumentType documentType;

}
