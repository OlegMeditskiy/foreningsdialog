package se.foreningsdialog.forening.payload.guestRegister;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GuestRegisterRequest {
    String username;
    String password;

    @Override
    public String toString() {
        return "GuestRegisterRequest{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
