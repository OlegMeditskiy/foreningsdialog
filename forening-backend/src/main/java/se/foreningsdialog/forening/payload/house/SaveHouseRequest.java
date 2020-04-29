package se.foreningsdialog.forening.payload.house;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveHouseRequest {
    Long houseId;
    private String street;
    private String city;
    private int zipCode;

}
