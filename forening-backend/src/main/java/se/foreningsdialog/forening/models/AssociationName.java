package se.foreningsdialog.forening.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import se.foreningsdialog.forening.models.houses.House;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AssociationName {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String associationName;

    @OneToMany
    List<ContactPerson> contacts;

    @OneToMany
    List<House> houses;

}
