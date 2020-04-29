package se.foreningsdialog.forening.payload.apartment;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.houses.Guest;

import javax.persistence.OneToMany;
import java.util.List;

@Getter
@Setter
public class ApartmentResponse {

    private Long id;

    @OneToMany
    private List<Guest> guests;

    private int number;

    private int area;

    private int roomAndKitchen;


}
