package se.foreningsdialog.forening.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.models.users.audit.UserDateAudit;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class AssociationName extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String associationName;

    @ManyToOne
    @JoinTable(name = "organizations_associations",joinColumns = @JoinColumn(name = "association_id"),inverseJoinColumns = @JoinColumn(name = "organization_id"))
    @JsonBackReference
    private Organization organization;

    @OneToMany(mappedBy = "associationName",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ContactPerson> contacts;

    @OneToMany(mappedBy = "associationName",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<News> news;

    @OneToMany(mappedBy = "associationName",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List <Event> events;

    @OneToMany(mappedBy = "associationName",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List <DocumentType> documentTypes;

    @OneToMany(mappedBy = "associationName",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<House> houses;

}
