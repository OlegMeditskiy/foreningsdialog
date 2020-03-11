package se.foreningsdialog.forening.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.ContactPerson;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.houses.Apartment;
import se.foreningsdialog.forening.models.houses.Guest;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.payload.apartment.DeleteApartmentRequest;
import se.foreningsdialog.forening.payload.apartment.NewApartmentRequest;
import se.foreningsdialog.forening.payload.apartment.SaveApartmentRequest;
import se.foreningsdialog.forening.payload.association.DeleteAssociationRequest;
import se.foreningsdialog.forening.payload.association.NewAssociationRequest;
import se.foreningsdialog.forening.payload.association.SaveAssociationRequest;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.payload.contact.DeleteContactRequest;
import se.foreningsdialog.forening.payload.contact.NewContactRequest;
import se.foreningsdialog.forening.payload.contact.SaveContactRequest;
import se.foreningsdialog.forening.payload.guest.DeleteGuestRequest;
import se.foreningsdialog.forening.payload.guest.NewGuestRequest;
import se.foreningsdialog.forening.payload.guest.SaveGuestRequest;
import se.foreningsdialog.forening.payload.house.DeleteHouseRequest;
import se.foreningsdialog.forening.payload.house.NewHouseRequest;
import se.foreningsdialog.forening.payload.house.SaveHouseRequest;
import se.foreningsdialog.forening.payload.organization.NewOrganisationsRequest;
import se.foreningsdialog.forening.repository.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Iterator;

@RestController
@RequestMapping("/api/associationAdmin")
public class AssociationAdminController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    ApartmentRepository apartmentRepository;

    @Autowired
    GuestRepository guestRepository;


    @Autowired
    OrganizationRepository organizationRepository;

    @Autowired
    HouseRepository houseRepository;

    @Autowired
    AssociationNameRepository associationNameRepository;

    @Autowired
    ContactPersonRepository contactPersonRepository;

    @PostMapping("/createOrganizations")
    public ResponseEntity<?> registerUser(@Valid @RequestBody NewOrganisationsRequest signUpRequest) {
        System.out.println(signUpRequest);
        //Creating new Organizations
        for (Organization organization: signUpRequest.getAssociation().getOrganizations()){
            for(AssociationName associationName: organization.getAssociations()){
//                for (ContactPerson contactPerson: associationName.getContacts()){
//                    contactPerson.setCreatedBy(signUpRequest.getUserId());
//                    contactPersonRepository.save(contactPerson);
//                }
//                for (House house:associationName.getHouses()){
//                    house.setCreatedBy(signUpRequest.getUserId());
//                    houseRepository.save(house);
//                }
                associationName.setCreatedBy(signUpRequest.getUserId());
//                associationName.setHouses(associationName.getHouses());
//                associationName.setContacts(associationName.getContacts());
                associationNameRepository.save(associationName);
            }
            organization.setAssociations(organization.getAssociations());
            organization.setCreatedBy(signUpRequest.getUserId());
            organizationRepository.save(organization);
        }

//        URI location = ServletUriComponentsBuilder
//                .fromCurrentContextPath().path("/users/{username}")
//                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
//        return ResponseEntity.ok().body("Created");
    }

    @PostMapping("/saveAssociation")
    public ResponseEntity<?> saveAssociation(@Valid @RequestBody SaveAssociationRequest saveAssociationRequest) {
        AssociationName association = associationNameRepository.findById(saveAssociationRequest.getAssociation().getId()).get();
        System.out.println(saveAssociationRequest.getAssociationName());
        association.setAssociationName(saveAssociationRequest.getAssociationName());
        associationNameRepository.save(association);

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    @PostMapping("/createAssociation")
    public ResponseEntity<?> createAssociation(@Valid @RequestBody NewAssociationRequest newAssociationRequest) {
        Organization organization = organizationRepository.findById(newAssociationRequest.getOrganizationId()).get();
        System.out.println("createNew");
        AssociationName association = new AssociationName();
        association.setOrganization(organization);
        association.setAssociationName(newAssociationRequest.getAssociationName());
        association.setCreatedBy(newAssociationRequest.getUserId());
        associationNameRepository.save(association);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @DeleteMapping("/deleteAssociation")
    @Transactional
    public ResponseEntity<?> deleteAssociation(@Valid @RequestBody DeleteAssociationRequest deleteAssociationRequest) {
        Organization organization = organizationRepository.findById(deleteAssociationRequest.getOrganizationId()).get();
        AssociationName associationName = deleteAssociationRequest.getAssociation();
        System.out.println("Houses before:"+associationName.getHouses());
        for (Iterator<House> iterator = associationName.getHouses().iterator(); iterator.hasNext();) {
                House house = iterator.next();
                house.setAssociationName(null);
                iterator.remove();
                houseRepository.delete(house);
        }
        for (Iterator<ContactPerson> iterator = associationName.getContacts().iterator(); iterator.hasNext();) {
            ContactPerson contactPerson = iterator.next();
            contactPerson.setAssociationName(null);
            iterator.remove();
            contactPersonRepository.delete(contactPerson);
        }
        System.out.println("Houses after:"+associationName.getHouses());
        associationNameRepository.delete(associationName);

//

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/saveHouse")
    public ResponseEntity<?> saveHouse(@Valid @RequestBody SaveHouseRequest saveHouseRequest) {
        System.out.println("Save house");
        House house = houseRepository.findById(saveHouseRequest.getHouseId()).get();
        house.setCity(saveHouseRequest.getCity());
        house.setStreet(saveHouseRequest.getStreet());
        house.setZipCode(saveHouseRequest.getZipCode());
        houseRepository.save(house);

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/createHouse")
    public ResponseEntity<?> createHouse(@Valid @RequestBody NewHouseRequest newHouseRequest) {
        System.out.println("Create house: "+newHouseRequest);
        AssociationName association = associationNameRepository.findById(newHouseRequest.getAssociationId()).get();
        House house = new House();
        house.setCity(newHouseRequest.getCity());
        house.setZipCode(newHouseRequest.getZipCode());
        house.setStreet(newHouseRequest.getStreet());
        house.setAssociationName(association);
        houseRepository.save(house);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    @DeleteMapping("/deleteHouse")
    @Transactional
    public ResponseEntity<?> deleteHouse(@Valid @RequestBody DeleteHouseRequest deleteHouseRequest) {
        AssociationName association = associationNameRepository.findById(deleteHouseRequest.getAssociationId()).get();
        House house = houseRepository.findById(deleteHouseRequest.getHouseId()).get();
        association.getHouses().remove(house);
        house.setAssociationName(null);
        associationNameRepository.save(association);
        houseRepository.delete(house);

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    @PostMapping("/saveContact")
    public ResponseEntity<?> saveContact(@Valid @RequestBody SaveContactRequest saveContactRequest) {
        ContactPerson contactPerson = contactPersonRepository.findById(saveContactRequest.getContactId()).get();
        contactPerson.setContactEmail(saveContactRequest.getContactEmail());
        contactPerson.setContactName(saveContactRequest.getContactName());
        contactPerson.setContactTelephone(saveContactRequest.getContactTelephone());
        contactPersonRepository.save(contactPerson);

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/createContact")
    public ResponseEntity<?> createContact(@Valid @RequestBody NewContactRequest newContactRequest) {
        AssociationName association = associationNameRepository.findById(newContactRequest.getAssociationId()).get();
        ContactPerson contactPerson = new ContactPerson();
        contactPerson.setContactEmail(newContactRequest.getContactEmail());
        contactPerson.setContactName(newContactRequest.getContactName());
        contactPerson.setContactTelephone(newContactRequest.getContactTelephone());
        contactPerson.setAssociationName(association);
        contactPersonRepository.save(contactPerson);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    @DeleteMapping("/deleteContact")
    @Transactional
    public ResponseEntity<?> deleteContact(@Valid @RequestBody DeleteContactRequest deleteContactRequest) {
        AssociationName association = associationNameRepository.findById(deleteContactRequest.getAssociationId()).get();
        ContactPerson contactPerson = contactPersonRepository.findById(deleteContactRequest.getContactId()).get();
        association.getContacts().remove(contactPerson);
        contactPerson.setAssociationName(null);
        associationNameRepository.save(association);
        contactPersonRepository.delete(contactPerson);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/saveApartment")
    public ResponseEntity<?> saveApartment(@Valid @RequestBody SaveApartmentRequest saveApartmentRequest) {
        Apartment apartment = apartmentRepository.findById(saveApartmentRequest.getApartmentId()).get();
        apartment.setRoomAndKitchen(saveApartmentRequest.getRoomAndKitchen());
        apartment.setNumber(saveApartmentRequest.getNumber());
        apartment.setArea(saveApartmentRequest.getArea());
        apartmentRepository.save(apartment);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/createApartment")
    public ResponseEntity<?> createApartment(@Valid @RequestBody NewApartmentRequest newApartmentRequest) {
        House house = houseRepository.findById(newApartmentRequest.getHouseId()).get();
        System.out.println(newApartmentRequest);
        Apartment apartment = new Apartment(newApartmentRequest.getNumber(),newApartmentRequest.getRoomAndKitchen(),newApartmentRequest.getArea(),house);
        apartmentRepository.save(apartment);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    @DeleteMapping("/deleteApartment")
    @Transactional
    public ResponseEntity<?> deleteApartment(@Valid @RequestBody DeleteApartmentRequest deleteApartmentRequest) {
        House house = houseRepository.findById(deleteApartmentRequest.getHouseId()).get();
        Apartment apartment = apartmentRepository.findById(deleteApartmentRequest.getApartmentId()).get();
        house.getApartments().remove(apartment);
        apartment.setHouse(null);
        houseRepository.save(house);
        apartmentRepository.delete(apartment);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/saveGuest")
    public ResponseEntity<?> saveApartment(@Valid @RequestBody SaveGuestRequest saveGuestRequest) {
        Guest guest = guestRepository.findById(saveGuestRequest.getGuestId()).get();
        guest.setEmail(saveGuestRequest.getEmail());
        guestRepository.save(guest);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/createGuest")
    public ResponseEntity<?> createApartment(@Valid @RequestBody NewGuestRequest newGuestRequest) {
        Apartment apartment = apartmentRepository.findById(newGuestRequest.getApartmentId()).get();
        Guest guest = new Guest();
        guest.setEmail(newGuestRequest.getEmail());
        guest.setApartment(apartment);
        guestRepository.save(guest);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    @DeleteMapping("/deleteGuest")
    @Transactional
    public ResponseEntity<?> deleteApartment(@Valid @RequestBody DeleteGuestRequest deleteGuestRequest) {
        Apartment apartment = apartmentRepository.findById(deleteGuestRequest.getApartmentId()).get();
        Guest guest = guestRepository.findById(deleteGuestRequest.getGuestId()).get();
        apartment.getGuests().remove(guest);
        guest.setApartment(null);
        apartmentRepository.save(apartment);
        guestRepository.delete(guest);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }


}
