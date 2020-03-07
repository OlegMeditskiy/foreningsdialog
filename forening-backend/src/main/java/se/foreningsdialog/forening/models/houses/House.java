package se.foreningsdialog.forening.models.houses;

import lombok.Data;
import se.foreningsdialog.forening.models.users.audit.UserDateAudit;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class House extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String street;

    private String city;

    private int zipCode;

    @OneToMany
    private List<Apartment> apartments;
}
