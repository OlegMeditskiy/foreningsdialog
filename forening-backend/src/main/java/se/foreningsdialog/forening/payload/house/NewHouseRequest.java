package se.foreningsdialog.forening.payload.house;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewHouseRequest {
    private Long associationId;
    private String street;
    private String city;
    private int zipCode;

    @Override
    public String toString() {
        return "NewHouseRequest{" +
                "associationId=" + associationId +
                ", street='" + street + '\'' +
                ", city='" + city + '\'' +
                ", zipCode=" + zipCode +
                '}';
    }
}
