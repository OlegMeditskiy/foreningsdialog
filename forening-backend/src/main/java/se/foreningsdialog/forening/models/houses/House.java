package se.foreningsdialog.forening.models.houses;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.users.audit.UserDateAudit;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class House extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String street;

    private String city;

    private int zipCode;

    @ManyToOne
    @JoinTable(name = "associations_houses",joinColumns = @JoinColumn(name = "house_id"),inverseJoinColumns = @JoinColumn(name = "association_id"))
    @JsonBackReference
    private AssociationName associationName;

    @OneToMany(mappedBy = "house",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Apartment> apartments;

}
