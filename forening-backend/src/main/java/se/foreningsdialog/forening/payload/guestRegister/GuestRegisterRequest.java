package se.foreningsdialog.forening.payload.guestRegister;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class GuestRegisterRequest {
    String username;
    String password;
    UUID uniqueKey;

    @Override
    public String toString() {
        return "GuestRegisterRequest{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", uniqueKey=" + uniqueKey +
                '}';
    }
}
