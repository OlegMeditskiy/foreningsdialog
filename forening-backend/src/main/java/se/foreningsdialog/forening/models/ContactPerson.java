package se.foreningsdialog.forening.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.foreningsdialog.forening.models.users.audit.UserDateAudit;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Entity
public class ContactPerson extends UserDateAudit{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinTable(name = "associations_contacts",joinColumns = @JoinColumn(name = "contact_id"),inverseJoinColumns = @JoinColumn(name = "association_id"))
    @JsonBackReference
    private AssociationName associationName;

    private String contactName;

    private String contactTelephone;

    private String contactEmail;


}
