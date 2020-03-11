package se.foreningsdialog.forening.payload.apartment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveApartmentRequest {
    Long apartmentId;
    private int number;

    private int area;

    private int roomAndKitchen;
}
