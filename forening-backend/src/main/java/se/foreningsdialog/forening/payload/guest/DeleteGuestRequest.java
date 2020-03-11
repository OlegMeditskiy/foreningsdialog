package se.foreningsdialog.forening.payload.guest;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.AssociationName;

@Getter
@Setter
public class DeleteGuestRequest {
    Long apartmentId;
    Long guestId;

    @Override
    public String toString() {
        return "DeleteGuestRequest{" +
                "apartmentId=" + apartmentId +
                ", guestId=" + guestId +
                '}';
    }
}
