package se.foreningsdialog.forening.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.foreningsdialog.forening.payload.MailRequest;
import se.foreningsdialog.forening.payload.apartment.SaveApartmentRequest;
import se.foreningsdialog.forening.payload.association.SaveAssociationRequest;
import se.foreningsdialog.forening.payload.association.SaveNewsRequest;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.payload.contact.SaveContactRequest;
import se.foreningsdialog.forening.payload.guest.SaveGuestRequest;
import se.foreningsdialog.forening.payload.house.SaveHouseRequest;
import se.foreningsdialog.forening.payload.loanSettings.LoanSettingsRequest;
import se.foreningsdialog.forening.payload.organization.SaveOrganizationRequest;
import se.foreningsdialog.forening.payload.organization.UpdateProtocolRequest;
import se.foreningsdialog.forening.service.*;
import se.foreningsdialog.forening.storage.StorageService;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/associationAdmin/save")
public class AdminSaveObjectController {
    private final StorageService storageService;
    private final ContactPersonService contactPersonService;
    private final HouseService houseService;
    private final GuestService guestService;
    private final AssociationService associationService;
    private final OrganizationService organizationService;
    private final LoanSettingsService loanSettingsService;
    private final ApartmentService apartmentService;
    private final NewsService newsService;

    public AdminSaveObjectController(ApartmentService apartmentService, StorageService storageService, ContactPersonService contactPersonService, HouseService houseService, GuestService guestService, AssociationService associcationService, OrganizationService organizationService, LoanSettingsService loanSettingsService, NewsService newsService) {
        this.apartmentService = apartmentService;
        this.storageService = storageService;
        this.contactPersonService = contactPersonService;
        this.houseService = houseService;
        this.guestService = guestService;
        this.associationService = associcationService;
        this.organizationService = organizationService;
        this.loanSettingsService = loanSettingsService;
        this.newsService = newsService;
    }


    @PostMapping("/association")
    public ResponseEntity<?> saveAssociation(@Valid @RequestBody SaveAssociationRequest saveAssociationRequest) {
       return associationService.saveAssociation(saveAssociationRequest);
    }

    @PostMapping("/house")
    public ResponseEntity<?> saveHouse(@Valid @RequestBody SaveHouseRequest saveHouseRequest) {
       return houseService.saveHouse(saveHouseRequest);
    }

    @PostMapping("/contact")
    public ResponseEntity<?> saveContact(@Valid @RequestBody SaveContactRequest saveContactRequest) {
        return contactPersonService.saveContact(saveContactRequest);
    }
    @PostMapping("/news")
    public ResponseEntity<?> saveNews(@Valid @RequestBody SaveNewsRequest saveNewsRequest) {
        return newsService.saveNews(saveNewsRequest);
    }
    @PostMapping(value = "/protocol",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> saveContact(@RequestPart("file") @Valid @NotNull @NotBlank @RequestParam MultipartFile file,
                                         @RequestPart ("properties") @Valid UpdateProtocolRequest updateProtocolRequest) {
        String filename = "organisation_"+updateProtocolRequest.getId()+"_ArsProtokoll";
        storageService.saveAs(file,filename);
        return ResponseEntity.ok().body(new ApiResponse(true, "Protocol was updated"));
    }

    @PostMapping("/apartment")
    public ResponseEntity<?> saveApartment(@Valid @RequestBody SaveApartmentRequest saveApartmentRequest) {
        return apartmentService.saveApartment(saveApartmentRequest);
    }

    @PostMapping("/guest")
    public ResponseEntity<?> saveGuest(@Valid @RequestBody SaveGuestRequest saveGuestRequest) {
        return guestService.saveGuest(saveGuestRequest);
    }

    @PostMapping("/declinedOrganization")
    public ResponseEntity<?> saveDeclinedOrganization(@Valid @RequestBody SaveOrganizationRequest saveOrganizationRequest) {
        return organizationService.saveDeclinedOrganization(saveOrganizationRequest);
    }
    @PostMapping("/notActivatedOrganization")
    public ResponseEntity<?> saveNotActivatedOrganization(@Valid @RequestBody SaveOrganizationRequest saveOrganizationRequest) {
       return organizationService.saveNotActivatedOrganization(saveOrganizationRequest);
    }

    @PostMapping("/activatedOrganization")
    public ResponseEntity<?> saveActivated(@Valid @RequestBody SaveOrganizationRequest saveOrganizationRequest) {
        return organizationService.saveActivated(saveOrganizationRequest);
    }


    @PostMapping("/sendMailToGuest")
    public ResponseEntity<?> sendMailToMember(@Valid @RequestBody MailRequest mailRequest) {
        return guestService.sendMailToMember(mailRequest);
    }

    @PostMapping("/settings")
    public ResponseEntity<?> saveSettings(@Valid @RequestBody LoanSettingsRequest saveSettingsRequest) {
        return loanSettingsService.saveSettings(saveSettingsRequest);
    }

}
