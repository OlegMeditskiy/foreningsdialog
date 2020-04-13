package se.foreningsdialog.forening.payload.association;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.ContactPerson;
import se.foreningsdialog.forening.models.houses.House;

import javax.persistence.OneToMany;
import java.util.List;

@Getter
@Setter
public class AssociationNameResponse {
    private Long id;
    private String associationName;

    @OneToMany
    private List<ContactPerson> contacts;

    @OneToMany
    private List<House> houses;
}
