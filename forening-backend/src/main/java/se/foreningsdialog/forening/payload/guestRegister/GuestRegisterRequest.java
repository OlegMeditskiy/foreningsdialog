package se.foreningsdialog.forening.payload.guestRegister;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class GuestRegisterRequest {
    private String username;
    private String password;
    private UUID uniqueKey;
    private Long guestId;
    private String name;
}
