package se.foreningsdialog.forening.payload.apartment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewApartmentRequest {
    private Long houseId;
    private int number;
    private int area;
    private int roomAndKitchen;

    @Override
    public String toString() {
        return "NewApartmentRequest{" +
                "houseId=" + houseId +
                ", number=" + number +
                ", area=" + area +
                ", roomAndKitchen=" + roomAndKitchen +
                '}';
    }
}
