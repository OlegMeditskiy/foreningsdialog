package se.foreningsdialog.forening.models.houses;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String street;

    private String city;

    private int zipCode;

    @OneToMany
    private List<Apartment> apartments;
}
