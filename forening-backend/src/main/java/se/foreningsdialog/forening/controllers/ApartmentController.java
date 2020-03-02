package se.foreningsdialog.forening.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.foreningsdialog.forening.models.houses.Apartment;
import se.foreningsdialog.forening.payload.ApartmentRequest;
import se.foreningsdialog.forening.payload.ApiResponse;
import se.foreningsdialog.forening.repository.ApartmentRepository;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/apartment")
public class ApartmentController {
    @Autowired
    ApartmentRepository apartmentRepository;

    @PostMapping("/addAppartment")
    public ResponseEntity<?> addAppartment(@Valid @RequestBody ApartmentRequest apartmentRequest){
        Apartment apartment = new Apartment();
        apartment.setArea(apartmentRequest.getArea());
        apartment.setNumber(apartmentRequest.getNumber());
        apartment.setRoomAndKitchen(apartmentRequest.getRoomAndKitchen());
        apartmentRepository.save(apartment);
        return ResponseEntity.ok().body(new ApiResponse(true, "Apartment was created successfully"));
    }
}
