package se.foreningsdialog.forening.payload.guest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveGuestRequest {
    Long guestId;
    private String email;

}
