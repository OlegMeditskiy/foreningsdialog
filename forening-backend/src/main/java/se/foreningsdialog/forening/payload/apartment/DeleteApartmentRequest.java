package se.foreningsdialog.forening.payload.apartment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeleteApartmentRequest {
    Long houseId;
    Long apartmentId;
}
