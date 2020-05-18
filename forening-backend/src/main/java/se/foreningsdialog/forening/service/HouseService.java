package se.foreningsdialog.forening.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.exception.ResourceNotFoundException;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.houses.Apartment;
import se.foreningsdialog.forening.models.houses.Guest;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.payload.house.DeleteHouseRequest;
import se.foreningsdialog.forening.payload.house.HouseResponse;
import se.foreningsdialog.forening.payload.house.NewHouseRequest;
import se.foreningsdialog.forening.payload.house.SaveHouseRequest;
import se.foreningsdialog.forening.repository.AssociationNameRepository;
import se.foreningsdialog.forening.repository.HouseRepository;
import se.foreningsdialog.forening.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class HouseService {
    private final
    UserRepository userRepository;

    private final
    HouseRepository houseRepository;

    private final
    AssociationNameRepository associationNameRepository;

    public HouseService(UserRepository userRepository, HouseRepository houseRepository, AssociationNameRepository associationNameRepository) {
        this.userRepository = userRepository;
        this.houseRepository = houseRepository;
        this.associationNameRepository = associationNameRepository;
    }

    public HouseResponse getHouseCreatedBy(String username, Long houseId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        House house = houseRepository.getOne(houseId);

        HouseResponse houseResponse = new HouseResponse();
        if (house.getCreatedBy().equals(user.getId())) {
            houseResponse.setCity(house.getCity());
            houseResponse.setStreet(house.getStreet());
            houseResponse.setZipCode(house.getZipCode());
            houseResponse.setId(house.getId());
            houseResponse.setAssociationId(house.getAssociationName().getId());
            houseResponse.setOrganizationId(house.getAssociationName().getOrganization().getId());
            try {
                houseResponse.setApartments(house.getApartments());
                List<Guest> guests = new ArrayList<>();
                for (Apartment apartment : house.getApartments()) {
                    guests.addAll(apartment.getGuests());
                }
                houseResponse.setGuests(guests);

            } catch (Exception ex) {
                System.out.println(ex);
            }

        }
        return houseResponse;
    }
    public ResponseEntity<?> createHouse(NewHouseRequest newHouseRequest) {
        AssociationName association = associationNameRepository.getOne(newHouseRequest.getAssociationId());
        House house = new House();
        house.setCity(newHouseRequest.getCity());
        house.setZipCode(newHouseRequest.getZipCode());
        house.setStreet(newHouseRequest.getStreet());
        house.setAssociationName(association);
        houseRepository.save(house);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    public ResponseEntity<?> deleteHouse(DeleteHouseRequest deleteHouseRequest) {
        House house = houseRepository.getOne(deleteHouseRequest.getHouseId());
        house.setAssociationName(null);
        houseRepository.delete(house);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    public ResponseEntity<?> saveHouse(SaveHouseRequest saveHouseRequest) {
        House house = houseRepository.getOne(saveHouseRequest.getHouseId());
        house.setCity(saveHouseRequest.getCity());
        house.setStreet(saveHouseRequest.getStreet());
        house.setZipCode(saveHouseRequest.getZipCode());
        houseRepository.save(house);

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
}
