package se.foreningsdialog.forening.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.exception.ResourceNotFoundException;
import se.foreningsdialog.forening.models.houses.Apartment;
import se.foreningsdialog.forening.models.houses.Guest;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.models.users.User;

import se.foreningsdialog.forening.payload.house.HouseResponse;
import se.foreningsdialog.forening.repository.HouseRepository;
import se.foreningsdialog.forening.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HouseService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    HouseRepository houseRepository;

    public HouseResponse getHouseCreatedBy(String username, Long houseId){

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        House house = houseRepository.findById(houseId).get();

        HouseResponse houseResponse = new HouseResponse();
        if(house!=null && house.getCreatedBy()==user.getId()){
            houseResponse.setCity(house.getCity());
            houseResponse.setStreet(house.getStreet());
            houseResponse.setZipCode(house.getZipCode());
            houseResponse.setId(house.getId());
            try{
                houseResponse.setApartments(house.getApartments());
                List<Guest> guests = new ArrayList<>();
                for (Apartment apartment: house.getApartments()){
                    for (Guest guest: apartment.getGuests()){
                        guests.add(guest);
                    }
                }
                houseResponse.setGuests(guests);

            }catch (Exception ex){
                System.out.println(ex);
            }

        }
        return houseResponse;
    }
}
