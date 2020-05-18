package se.foreningsdialog.forening.payload.house;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.houses.Apartment;
import se.foreningsdialog.forening.models.houses.Guest;

import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import java.util.List;

@Getter
@Setter
public class HouseResponse {
    private Long id;
    private Long associationId;
    private Long organizationId;
    private String street;

    private String city;

    private int zipCode;

    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL)
    private List<Apartment> apartments;

    @OneToMany
    private List<Guest> guests;
}
