package se.foreningsdialog.forening.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.foreningsdialog.forening.models.*;
import se.foreningsdialog.forening.models.houses.Apartment;
import se.foreningsdialog.forening.models.houses.Guest;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.payload.DeleteDocumentTypeRequest;
import se.foreningsdialog.forening.payload.apartment.DeleteApartmentRequest;
import se.foreningsdialog.forening.payload.association.DeleteAssociationRequest;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.payload.contact.DeleteContactRequest;
import se.foreningsdialog.forening.payload.guest.DeleteGuestRequest;
import se.foreningsdialog.forening.payload.house.DeleteHouseRequest;
import se.foreningsdialog.forening.repository.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Iterator;

@RestController
@Transactional
@RequestMapping("/api/associationAdmin/delete")
public class AdminDeleteObjectsController {

    final
    ApartmentRepository apartmentRepository;

    final
    GuestRepository guestRepository;

    final
    OrganizationRepository organizationRepository;

    final
    HouseRepository houseRepository;

    final
    AssociationNameRepository associationNameRepository;

    final
    ContactPersonRepository contactPersonRepository;
    final
    DocumentTypeRepository documentTypeRepository;

    final
    DocumentRepository documentRepository;

    public AdminDeleteObjectsController(ApartmentRepository apartmentRepository, GuestRepository guestRepository, OrganizationRepository organizationRepository, HouseRepository houseRepository, AssociationNameRepository associationNameRepository, ContactPersonRepository contactPersonRepository, DocumentTypeRepository documentTypeRepository, DocumentRepository documentRepository) {
        this.apartmentRepository = apartmentRepository;
        this.guestRepository = guestRepository;
        this.organizationRepository = organizationRepository;
        this.houseRepository = houseRepository;
        this.associationNameRepository = associationNameRepository;
        this.contactPersonRepository = contactPersonRepository;
        this.documentTypeRepository = documentTypeRepository;
        this.documentRepository = documentRepository;
    }


    @DeleteMapping("/association")
    public ResponseEntity<?> deleteAssociation(@Valid @RequestBody DeleteAssociationRequest deleteAssociationRequest) {
        Organization organization = organizationRepository.getOne(deleteAssociationRequest.getOrganizationId());
        AssociationName associationName = deleteAssociationRequest.getAssociation();
        for (Iterator<House> iterator = associationName.getHouses().iterator(); iterator.hasNext(); ) {
            House house = iterator.next();
            house.setAssociationName(null);
            iterator.remove();
            houseRepository.delete(house);
        }
        for (Iterator<ContactPerson> iterator = associationName.getContacts().iterator(); iterator.hasNext(); ) {
            ContactPerson contactPerson = iterator.next();
            contactPerson.setAssociationName(null);
            iterator.remove();
            contactPersonRepository.delete(contactPerson);
        }
        associationNameRepository.delete(associationName);

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }





    @DeleteMapping("/house")
    public ResponseEntity<?> deleteHouse(@Valid @RequestBody DeleteHouseRequest deleteHouseRequest) {
        AssociationName association = associationNameRepository.getOne(deleteHouseRequest.getAssociationId());
        House house = houseRepository.getOne(deleteHouseRequest.getHouseId());
        association.getHouses().remove(house);
        house.setAssociationName(null);
        associationNameRepository.save(association);
        houseRepository.delete(house);

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }





    @DeleteMapping("/contact")
    public ResponseEntity<?> deleteContact(@Valid @RequestBody DeleteContactRequest deleteContactRequest) {
        AssociationName association = associationNameRepository.getOne(deleteContactRequest.getAssociationId());
        ContactPerson contactPerson = contactPersonRepository.getOne(deleteContactRequest.getContactId());
        association.getContacts().remove(contactPerson);
        contactPerson.setAssociationName(null);
        associationNameRepository.save(association);
        contactPersonRepository.delete(contactPerson);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }





    @DeleteMapping("/apartment")
    public ResponseEntity<?> deleteApartment(@Valid @RequestBody DeleteApartmentRequest deleteApartmentRequest) {
        House house = houseRepository.getOne(deleteApartmentRequest.getHouseId());
        Apartment apartment = apartmentRepository.getOne(deleteApartmentRequest.getApartmentId());
        house.getApartments().remove(apartment);
        apartment.setHouse(null);
        houseRepository.save(house);
        apartmentRepository.delete(apartment);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }





    @DeleteMapping("/guest")
    public ResponseEntity<?> deleteApartment(@Valid @RequestBody DeleteGuestRequest deleteGuestRequest) {
        Apartment apartment = apartmentRepository.getOne(deleteGuestRequest.getApartmentId());
        Guest guest = guestRepository.getOne(deleteGuestRequest.getGuestId());
        apartment.getGuests().remove(guest);
        guest.setApartment(null);
        apartmentRepository.save(apartment);
        guestRepository.delete(guest);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    @DeleteMapping("/documentType")
    public ResponseEntity<?> documentType(@Valid @RequestBody DeleteDocumentTypeRequest deleteDocumentTypeRequest) {
        System.out.println(deleteDocumentTypeRequest.getId());
        DocumentType documentType = documentTypeRepository.getOne(deleteDocumentTypeRequest.getId());
        for (Document document: documentType.getDocuments()){
            documentRepository.delete(document);
        }
        documentTypeRepository.delete(documentType);
        return ResponseEntity.ok().body(new ApiResponse(true, "Dokument type was deleted"));
    }
    @DeleteMapping("/document")
    public ResponseEntity<?> document(@Valid @RequestBody DeleteDocumentTypeRequest deleteDocumentTypeRequest) {
        System.out.println(deleteDocumentTypeRequest.getId());
        Document document = documentRepository.getOne(deleteDocumentTypeRequest.getId());
        document.setDocumentType(null);
        documentRepository.delete(document);
        return ResponseEntity.ok().body(new ApiResponse(true, "Dokument was deleted"));
    }
    @DeleteMapping("/organization")
    public ResponseEntity<?> organization(@Valid @RequestBody DeleteDocumentTypeRequest deleteDocumentTypeRequest) {
       Organization organization = organizationRepository.getOne(deleteDocumentTypeRequest.getId());
       for (AssociationName associationName: organization.getAssociations()){
            for (House house:associationName.getHouses()){
                for (Apartment apartment: house.getApartments()){
                        for (Guest guest:apartment.getGuests()){
                            guestRepository.delete(guest);
                        }
                        apartmentRepository.delete(apartment);
                }
                houseRepository.delete(house);
            }
           for (ContactPerson contactPerson:associationName.getContacts()){
               contactPersonRepository.delete(contactPerson);
           }
           associationNameRepository.delete(associationName);
       }
       organizationRepository.delete(organization);
        return ResponseEntity.ok().body(new ApiResponse(true, "Dokument was deleted"));
    }
}
