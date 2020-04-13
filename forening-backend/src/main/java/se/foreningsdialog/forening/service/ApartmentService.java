package se.foreningsdialog.forening.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.exception.ResourceNotFoundException;
import se.foreningsdialog.forening.models.houses.Apartment;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.payload.apartment.ApartmentResponse;
import se.foreningsdialog.forening.payload.house.HouseResponse;
import se.foreningsdialog.forening.repository.ApartmentRepository;
import se.foreningsdialog.forening.repository.HouseRepository;
import se.foreningsdialog.forening.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApartmentService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ApartmentRepository apartmentRepository;

    public ApartmentResponse getApartmentCreatedBy(String username, Long apartmentId){

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        Apartment apartment = apartmentRepository.findById(apartmentId).get();

        ApartmentResponse apartmentResponse = new ApartmentResponse();
        if(apartment!=null && apartment.getCreatedBy()==user.getId()){
           apartmentResponse.setArea(apartment.getArea());
           apartmentResponse.setNumber(apartment.getNumber());
           apartmentResponse.setRoomAndKitchen(apartment.getRoomAndKitchen());
            try{
                apartmentResponse.setGuests(apartment.getGuests());
            }catch (Exception ex){
                System.out.println(ex);
            }

        }
        return apartmentResponse;
    }
}
