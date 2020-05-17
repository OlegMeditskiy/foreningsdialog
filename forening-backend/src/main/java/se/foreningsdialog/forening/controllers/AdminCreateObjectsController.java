package se.foreningsdialog.forening.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.foreningsdialog.forening.models.*;
import se.foreningsdialog.forening.models.houses.Apartment;
import se.foreningsdialog.forening.models.houses.Guest;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.payload.DocumentRequest;
import se.foreningsdialog.forening.payload.DocumentTypeRequest;
import se.foreningsdialog.forening.payload.NewsRequest;
import se.foreningsdialog.forening.payload.apartment.NewApartmentRequest;
import se.foreningsdialog.forening.payload.association.NewAssociationRequest;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.payload.contact.NewContactRequest;
import se.foreningsdialog.forening.payload.guest.NewGuestRequest;
import se.foreningsdialog.forening.payload.house.NewHouseRequest;
import se.foreningsdialog.forening.repository.*;
import se.foreningsdialog.forening.storage.StorageService;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@RestController
@RequestMapping("/api/associationAdmin/create")
public class AdminCreateObjectsController {

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
    NewsRepository newsRepository;

    final
    DocumentTypeRepository documentTypeRepository;

    final DocumentRepository documentRepository;

    final StorageService storageService;

    public AdminCreateObjectsController(ApartmentRepository apartmentRepository, GuestRepository guestRepository, OrganizationRepository organizationRepository, HouseRepository houseRepository, AssociationNameRepository associationNameRepository, ContactPersonRepository contactPersonRepository, NewsRepository newsRepository, DocumentTypeRepository documentTypeRepository, DocumentRepository documentRepository, StorageService storageService) {
        this.apartmentRepository = apartmentRepository;
        this.guestRepository = guestRepository;
        this.organizationRepository = organizationRepository;
        this.houseRepository = houseRepository;
        this.associationNameRepository = associationNameRepository;
        this.contactPersonRepository = contactPersonRepository;
        this.newsRepository = newsRepository;
        this.documentTypeRepository = documentTypeRepository;
        this.documentRepository = documentRepository;
        this.storageService = storageService;
    }

    @PostMapping("/association")
    public ResponseEntity<?> createAssociation(@Valid @RequestBody NewAssociationRequest newAssociationRequest) {

        Organization organization = organizationRepository.getOne(newAssociationRequest.getOrganizationId());
        AssociationName association = new AssociationName();
        association.setOrganization(organization);
        association.setAssociationName(newAssociationRequest.getAssociationName());
        association.setCreatedBy(newAssociationRequest.getUserId());
        associationNameRepository.save(association);


        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/house")
    public ResponseEntity<?> createHouse(@Valid @RequestBody NewHouseRequest newHouseRequest) {
        AssociationName association = associationNameRepository.getOne(newHouseRequest.getAssociationId());
        House house = new House();
        house.setCity(newHouseRequest.getCity());
        house.setZipCode(newHouseRequest.getZipCode());
        house.setStreet(newHouseRequest.getStreet());
        house.setAssociationName(association);
        houseRepository.save(house);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/contact")
    public ResponseEntity<?> createContact(@Valid @RequestBody NewContactRequest newContactRequest) {
        AssociationName association = associationNameRepository.getOne(newContactRequest.getAssociationId());
        ContactPerson contactPerson = new ContactPerson();
        contactPerson.setContactEmail(newContactRequest.getContactEmail());
        contactPerson.setContactName(newContactRequest.getContactName());
        contactPerson.setContactTelephone(newContactRequest.getContactTelephone());
        contactPerson.setAssociationName(association);
        contactPersonRepository.save(contactPerson);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/apartment")
    public ResponseEntity<?> createApartment(@Valid @RequestBody NewApartmentRequest newApartmentRequest) {
        House house = houseRepository.getOne(newApartmentRequest.getHouseId());
        Apartment apartment = new Apartment(newApartmentRequest.getNumber(), newApartmentRequest.getRoomAndKitchen(), newApartmentRequest.getArea(), house);
        apartmentRepository.save(apartment);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/guest")
    public ResponseEntity<?> createApartment(@Valid @RequestBody NewGuestRequest newGuestRequest) {
        Apartment apartment = apartmentRepository.getOne(newGuestRequest.getApartmentId());
        Guest guest = new Guest();
        guest.setEmail(newGuestRequest.getEmail());
        guest.setApartment(apartment);
        guestRepository.save(guest);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/news")
    public ResponseEntity<?> createNews(@Valid @RequestBody NewsRequest newsRequest) {
        News news = new News();
        AssociationName associationName = associationNameRepository.getOne(newsRequest.getAssociationNameId());
        news.setAssociationName(associationName);
        news.setNewsText(newsRequest.getNewsText());
        news.setNewsTitle(newsRequest.getNewsTitle());
        newsRepository.save(news);
        return ResponseEntity.ok().body(new ApiResponse(true, "Nyhet var skapad."));
    }

    @PostMapping("/documentType")
    public ResponseEntity<?> createDocumentType(@Valid @RequestBody DocumentTypeRequest documentTypeRequest) {
        AssociationName associationName = associationNameRepository.getOne(documentTypeRequest.getAssociationNameId());
        DocumentType documentType = new DocumentType();
        documentType.setAssociationName(associationName);
        documentType.setTypeName(documentTypeRequest.getTypeName());
        documentTypeRepository.save(documentType);
        return ResponseEntity.ok().body(new ApiResponse(true, "Dokument typ var skapad."));
    }

    @PostMapping(value = "/document", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createDocument(
            @RequestPart("file") @Valid @NotNull @NotBlank @RequestParam MultipartFile file,
            @RequestPart ("properties") @Valid DocumentRequest documentRequest) {
        System.out.println(documentRequest);
        DocumentType documentType = documentTypeRepository.getOne(documentRequest.getDocumentTypeId());
        Document document = new Document();
        document.setDocumentType(documentType);
        document.setTitle(documentRequest.getTitle());
        documentRepository.save(document);
        String filename = UUID.randomUUID().toString();
        String documentName = "http://localhost:8080/files/"+storageService.saveAsString(file,filename);
        document.setDocumentName(documentName);
        documentRepository.save(document);
        return ResponseEntity.ok().body(new ApiResponse(true, "Dokument typ var skapad."));
    }




}
