package se.foreningsdialog.forening.payload.house;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.AssociationName;

@Getter
@Setter
public class SaveHouseRequest {
    Long houseId;
    private String street;
    private String city;
    private int zipCode;

}
