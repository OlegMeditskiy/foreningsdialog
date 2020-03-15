package se.foreningsdialog.forening.payload.guestRegister;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GuestRegisterResponse {
    private String address;
    private int number;
    private int area;
    private int roomAndKitchen;
}
