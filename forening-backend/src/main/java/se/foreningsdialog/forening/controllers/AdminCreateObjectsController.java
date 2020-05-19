package se.foreningsdialog.forening.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.foreningsdialog.forening.payload.apartment.NewApartmentRequest;
import se.foreningsdialog.forening.payload.association.DocumentRequest;
import se.foreningsdialog.forening.payload.association.DocumentTypeRequest;
import se.foreningsdialog.forening.payload.association.NewAssociationRequest;
import se.foreningsdialog.forening.payload.association.NewsRequest;
import se.foreningsdialog.forening.payload.contact.NewContactRequest;
import se.foreningsdialog.forening.payload.guest.NewGuestRequest;
import se.foreningsdialog.forening.payload.house.NewHouseRequest;
import se.foreningsdialog.forening.service.*;
import se.foreningsdialog.forening.storage.StorageService;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/associationAdmin/create")
public class AdminCreateObjectsController {

    private final StorageService storageService;

    private final ApartmentService apartmentService;

    private final ContactPersonService contactPersonService;

    private final HouseService houseService;
    private final GuestService guestService;
    private final AssociationService associcationService;
    private final DocumentTypeService documentTypeService;
    private final DocumentService documentService;
    private final NewsService newsService;

    public AdminCreateObjectsController(StorageService storageService, ApartmentService apartmentService, ContactPersonService contactPersonService, HouseService houseService, GuestService guestService, AssociationService associcationService, DocumentTypeService documentTypeService, DocumentService documentService, NewsService newsService) {
        this.storageService = storageService;
        this.apartmentService = apartmentService;
        this.contactPersonService = contactPersonService;
        this.houseService = houseService;
        this.guestService = guestService;
        this.associcationService = associcationService;
        this.documentTypeService = documentTypeService;
        this.documentService = documentService;
        this.newsService = newsService;
    }

    @PostMapping("/association")
    public ResponseEntity<?> createAssociation(@Valid @RequestBody NewAssociationRequest newAssociationRequest) {
        return associcationService.createAssociation(newAssociationRequest);
    }

    @PostMapping("/house")
    public ResponseEntity<?> createHouse(@Valid @RequestBody NewHouseRequest newHouseRequest) {
        return houseService.createHouse(newHouseRequest);

    }

    @PostMapping("/contact")
    public ResponseEntity<?> createContact(@Valid @RequestBody NewContactRequest newContactRequest) {
        return contactPersonService.createContact(newContactRequest);
    }

    @PostMapping("/apartment")
    public ResponseEntity<?> createApartment(@Valid @RequestBody NewApartmentRequest newApartmentRequest) {
        return apartmentService.createApartment(newApartmentRequest);
    }

    @PostMapping("/guest")
    public ResponseEntity<?> createGuest(@Valid @RequestBody NewGuestRequest newGuestRequest) {
        return guestService.createGuest(newGuestRequest);
    }

    @PostMapping("/news")
    public ResponseEntity<?> createNews(@Valid @RequestBody NewsRequest newsRequest) {
        return newsService.createNews(newsRequest);
    }

    @PostMapping("/documentType")
    public ResponseEntity<?> createDocumentType(@Valid @RequestBody DocumentTypeRequest documentTypeRequest) {
        return documentTypeService.createDocumentType(documentTypeRequest);
    }

    @PostMapping(value = "/document", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createDocument(
            @RequestPart("file") @Valid @NotNull @NotBlank @RequestParam MultipartFile file,
            @RequestPart("properties") @Valid DocumentRequest documentRequest) {
        return documentService.createDocument(file,documentRequest);
    }


}
