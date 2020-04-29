package se.foreningsdialog.forening.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.models.GuestRegister;
import se.foreningsdialog.forening.payload.guestRegister.GuestRegisterResponse;
import se.foreningsdialog.forening.repository.GuestRegisterRepository;

import java.util.UUID;

@Service
public class GuestService {

    @Autowired
    private GuestRegisterRepository guestRegisterRepository;

    public GuestRegisterResponse getGuestRegister(UUID uniqueKey){
        GuestRegister guestRegister = guestRegisterRepository.findByUniqueKey(uniqueKey);
        GuestRegisterResponse guestRegisterResponse = new GuestRegisterResponse();
        guestRegisterResponse.setAddress(guestRegister.getAddress());
        guestRegisterResponse.setArea(guestRegister.getArea());
        guestRegisterResponse.setNumber(guestRegister.getNumber());
        guestRegisterResponse.setRoomAndKitchen(guestRegister.getRoomAndKitchen());
        guestRegisterResponse.setActivated(guestRegister.isActivated());
        return  guestRegisterResponse;
    }
}
