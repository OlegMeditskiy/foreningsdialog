package se.foreningsdialog.forening.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.exception.ResourceNotFoundException;
import se.foreningsdialog.forening.models.houses.Apartment;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.payload.apartment.ApartmentResponse;
import se.foreningsdialog.forening.payload.apartment.DeleteApartmentRequest;
import se.foreningsdialog.forening.payload.apartment.NewApartmentRequest;
import se.foreningsdialog.forening.payload.apartment.SaveApartmentRequest;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.repository.ApartmentRepository;
import se.foreningsdialog.forening.repository.HouseRepository;
import se.foreningsdialog.forening.repository.UserRepository;

@Service
public class ApartmentService {

    private final
    UserRepository userRepository;

    private final
    ApartmentRepository apartmentRepository;

    private final
    HouseRepository houseRepository;

    public ApartmentService(UserRepository userRepository, ApartmentRepository apartmentRepository, HouseRepository houseRepository) {
        this.userRepository = userRepository;
        this.apartmentRepository = apartmentRepository;
        this.houseRepository = houseRepository;
    }

    public ApartmentResponse getApartmentCreatedBy(String username, Long apartmentId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        Apartment apartment = apartmentRepository.getOne(apartmentId);

        ApartmentResponse apartmentResponse = new ApartmentResponse();
        if (apartment.getCreatedBy().equals(user.getId())) {
            apartmentResponse.setArea(apartment.getArea());
            apartmentResponse.setNumber(apartment.getNumber());
            apartmentResponse.setRoomAndKitchen(apartment.getRoomAndKitchen());
            apartmentResponse.setHouseId(apartment.getHouse().getId());
            apartmentResponse.setAssociationId(apartment.getHouse().getAssociationName().getId());
            apartmentResponse.setOrganizationId(apartment.getHouse().getAssociationName().getOrganization().getId());

            try {
                apartmentResponse.setGuests(apartment.getGuests());
            } catch (Exception ex) {
                System.out.println(ex);
            }

        }
        return apartmentResponse;
    }

    public ResponseEntity<?> createApartment(NewApartmentRequest newApartmentRequest) {
        House house = houseRepository.getOne(newApartmentRequest.getHouseId());
        Apartment apartment = new Apartment(newApartmentRequest.getNumber(), newApartmentRequest.getRoomAndKitchen(), newApartmentRequest.getArea(), house);
        apartmentRepository.save(apartment);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    public ResponseEntity<?> deleteApartment(DeleteApartmentRequest deleteApartmentRequest) {
        Apartment apartment = apartmentRepository.getOne(deleteApartmentRequest.getApartmentId());
        apartment.setHouse(null);
        apartmentRepository.delete(apartment);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    public ResponseEntity<?> saveApartment(SaveApartmentRequest saveApartmentRequest) {
        Apartment apartment = apartmentRepository.getOne(saveApartmentRequest.getApartmentId());
        apartment.setRoomAndKitchen(saveApartmentRequest.getRoomAndKitchen());
        apartment.setNumber(saveApartmentRequest.getNumber());
        apartment.setArea(saveApartmentRequest.getArea());
        apartmentRepository.save(apartment);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
}
