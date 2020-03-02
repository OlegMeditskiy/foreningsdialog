package se.foreningsdialog.forening.payload;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.houses.Apartment;
import se.foreningsdialog.forening.models.users.Admin;

@Getter
@Setter
public class ApartmentRequest {
    private int number;

    private int area;

    private int roomAndKitchen;

    private AssociationName associationName;
}
