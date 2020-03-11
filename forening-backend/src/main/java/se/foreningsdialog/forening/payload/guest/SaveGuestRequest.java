package se.foreningsdialog.forening.payload.guest;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.AssociationName;

@Getter
@Setter
public class SaveGuestRequest {
    Long guestId;
    private String email;

}
