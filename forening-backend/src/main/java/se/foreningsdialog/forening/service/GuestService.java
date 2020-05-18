package se.foreningsdialog.forening.service;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.models.GuestRegister;
import se.foreningsdialog.forening.models.houses.Apartment;
import se.foreningsdialog.forening.models.houses.Guest;
import se.foreningsdialog.forening.payload.MailRequest;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.payload.guest.DeleteGuestRequest;
import se.foreningsdialog.forening.payload.guest.NewGuestRequest;
import se.foreningsdialog.forening.payload.guest.SaveGuestRequest;
import se.foreningsdialog.forening.payload.guestRegister.GuestRegisterResponse;
import se.foreningsdialog.forening.repository.ApartmentRepository;
import se.foreningsdialog.forening.repository.GuestRegisterRepository;
import se.foreningsdialog.forening.repository.GuestRepository;

import java.util.UUID;

@Service
public class GuestService {

    private final GuestRegisterRepository guestRegisterRepository;
    private final GuestRepository guestRepository;
    private final
    ApartmentRepository apartmentRepository;
    private final EmailService emailService;

    public GuestService(GuestRegisterRepository guestRegisterRepository, GuestRepository guestRepository, ApartmentRepository apartmentRepository, EmailService emailService) {
        this.guestRegisterRepository = guestRegisterRepository;
        this.guestRepository = guestRepository;
        this.apartmentRepository = apartmentRepository;
        this.emailService = emailService;
    }

    public GuestRegisterResponse getGuestRegister(UUID uniqueKey) {
        GuestRegister guestRegister = guestRegisterRepository.findByUniqueKey(uniqueKey);
        GuestRegisterResponse guestRegisterResponse = new GuestRegisterResponse();
        guestRegisterResponse.setAddress(guestRegister.getAddress());
        guestRegisterResponse.setArea(guestRegister.getArea());
        guestRegisterResponse.setNumber(guestRegister.getNumber());
        guestRegisterResponse.setRoomAndKitchen(guestRegister.getRoomAndKitchen());
        guestRegisterResponse.setActivated(guestRegister.isActivated());
        return guestRegisterResponse;
    }
    public ResponseEntity<?> createGuest(NewGuestRequest newGuestRequest) {
        Apartment apartment = apartmentRepository.getOne(newGuestRequest.getApartmentId());
        Guest guest = new Guest();
        guest.setEmail(newGuestRequest.getEmail());
        guest.setApartment(apartment);
        guestRepository.save(guest);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    public ResponseEntity<?> deleteGuest(DeleteGuestRequest deleteGuestRequest) {
        Guest guest = guestRepository.getOne(deleteGuestRequest.getGuestId());
        guest.setApartment(null);
        guestRepository.delete(guest);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    public ResponseEntity<?> saveGuest(SaveGuestRequest saveGuestRequest) {
        Guest guest = guestRepository.getOne(saveGuestRequest.getGuestId());
        guest.setEmail(saveGuestRequest.getEmail());
        guestRepository.save(guest);
        return ResponseEntity.ok().body(new ApiResponse(true, "Guest was saved"));
    }

    public ResponseEntity<?> sendMailToMember(MailRequest mailRequest) {
        Guest guest = guestRepository.getOne(mailRequest.getGuestId());
        System.out.println(guest);
        String address = guest.getApartment().getHouse().getStreet();
        System.out.println("Address:" + address);
        int number = guest.getApartment().getNumber();
        int area = guest.getApartment().getArea();
        int roomAndKitchen = guest.getApartment().getRoomAndKitchen();
        System.out.println(number + " " + " " + area + " " + roomAndKitchen);
        if (guest.getGuestRegister() != null) {
            System.out.println("exists");
            GuestRegister guestRegister = guestRegisterRepository.findByGuestId(guest.getId());
            String to = guest.getEmail();
            String subject = "Testing from Spring Boot";
            String text = "localhost:3000/guestRegister/" + guestRegister.getUniqueKey();
            emailService.sendSimpleMessage(to, subject, text);
        } else {
            System.out.println("createGuest");
            GuestRegister guestRegister = new GuestRegister(address, number, area, roomAndKitchen);
            guestRegisterRepository.save(guestRegister);
            guest.setGuestRegister(guestRegister);
            guestRepository.save(guest);
            String to = guest.getEmail();
            String subject = "Testing from Spring Boot";
            String text = "localhost:3000/guestRegister/" + guestRegister.getUniqueKey();
            emailService.sendSimpleMessage(to, subject, text);
        }
        return ResponseEntity.ok().body(new ApiResponse(true, "Mail was send"));
    }


}
