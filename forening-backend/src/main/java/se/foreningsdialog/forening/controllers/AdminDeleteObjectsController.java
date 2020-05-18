package se.foreningsdialog.forening.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.foreningsdialog.forening.payload.apartment.DeleteApartmentRequest;
import se.foreningsdialog.forening.payload.association.DeleteAssociationRequest;
import se.foreningsdialog.forening.payload.association.DeleteDocumentTypeRequest;
import se.foreningsdialog.forening.payload.association.DeleteNewsRequest;
import se.foreningsdialog.forening.payload.contact.DeleteContactRequest;
import se.foreningsdialog.forening.payload.guest.DeleteGuestRequest;
import se.foreningsdialog.forening.payload.house.DeleteHouseRequest;
import se.foreningsdialog.forening.service.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

@RestController
@Transactional
@RequestMapping("/api/associationAdmin/delete")
public class AdminDeleteObjectsController {
    private final ApartmentService apartmentService;
    private final ContactPersonService contactPersonService;
    private final HouseService houseService;
    private final GuestService guestService;
    private final AssociationService associationService;
    private final DocumentTypeService documentTypeService;
    private final DocumentService documentService;
    private final NewsService newsService;
    private final OrganizationService organizationService;
    public AdminDeleteObjectsController(ApartmentService apartmentService, ContactPersonService contactPersonService, HouseService houseService, GuestService guestService, AssociationService associcationService, DocumentTypeService documentTypeService, DocumentService documentService, NewsService newsService, OrganizationService organizationService) {
        this.apartmentService = apartmentService;
        this.contactPersonService = contactPersonService;
        this.houseService = houseService;
        this.guestService = guestService;
        this.associationService = associcationService;
        this.documentTypeService = documentTypeService;
        this.documentService = documentService;
        this.newsService = newsService;
        this.organizationService = organizationService;
    }


    @DeleteMapping("/association")
    public ResponseEntity<?> deleteAssociation(@Valid @RequestBody DeleteAssociationRequest deleteAssociationRequest) {
        return associationService.deleteAssociation(deleteAssociationRequest);
    }





    @DeleteMapping("/house")
    public ResponseEntity<?> deleteHouse(@Valid @RequestBody DeleteHouseRequest deleteHouseRequest) {
       return houseService.deleteHouse(deleteHouseRequest);
    }





    @DeleteMapping("/contact")
    public ResponseEntity<?> deleteContact(@Valid @RequestBody DeleteContactRequest deleteContactRequest) {
       return contactPersonService.deleteContact(deleteContactRequest);
    }





    @DeleteMapping("/apartment")
    public ResponseEntity<?> deleteApartment(@Valid @RequestBody DeleteApartmentRequest deleteApartmentRequest) {
       return apartmentService.deleteApartment(deleteApartmentRequest);
    }





    @DeleteMapping("/guest")
    public ResponseEntity<?> deleteGuest(@Valid @RequestBody DeleteGuestRequest deleteGuestRequest) {
        return guestService.deleteGuest(deleteGuestRequest);
    }
    @DeleteMapping("/documentType")
    public ResponseEntity<?> deleteDocumentType(@Valid @RequestBody DeleteDocumentTypeRequest deleteDocumentTypeRequest) {
        return documentTypeService.deleteDocumentType(deleteDocumentTypeRequest);
    }
    @DeleteMapping("/document")
    public ResponseEntity<?> deleteDocument(@Valid @RequestBody DeleteDocumentTypeRequest deleteDocumentTypeRequest) {
        return documentService.deleteDocument(deleteDocumentTypeRequest);
    }
    @DeleteMapping("/news")
    public ResponseEntity<?> deleteNews(@Valid @RequestBody DeleteNewsRequest deleteNewsRequest) {
        return newsService.deleteNews(deleteNewsRequest);
    }
    @DeleteMapping("/organization")
    public ResponseEntity<?> deleteOrganization(@Valid @RequestBody DeleteDocumentTypeRequest deleteDocumentTypeRequest) {
    return organizationService.deleteOrganization(deleteDocumentTypeRequest);
    }
}
