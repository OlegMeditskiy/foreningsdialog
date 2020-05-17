package se.foreningsdialog.forening.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.foreningsdialog.forening.models.*;
import se.foreningsdialog.forening.models.houses.Apartment;
import se.foreningsdialog.forening.models.houses.Guest;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.models.loanobjects.*;
import se.foreningsdialog.forening.payload.MailRequest;
import se.foreningsdialog.forening.payload.UpdateProtocolRequest;
import se.foreningsdialog.forening.payload.apartment.SaveApartmentRequest;
import se.foreningsdialog.forening.payload.association.SaveAssociationRequest;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.payload.contact.SaveContactRequest;
import se.foreningsdialog.forening.payload.guest.SaveGuestRequest;
import se.foreningsdialog.forening.payload.house.SaveHouseRequest;
import se.foreningsdialog.forening.payload.loanSettings.LoanSettingsRequest;
import se.foreningsdialog.forening.payload.organization.SaveOrganizationRequest;
import se.foreningsdialog.forening.repository.*;
import se.foreningsdialog.forening.repository.loanObjects.*;
import se.foreningsdialog.forening.storage.StorageService;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/associationAdmin/save")
public class AdminSaveObjectController {

    final
    AcceptOrganizationUpdateRepository acceptOrganizationUpdateRepository;

    final
    ApartmentRepository apartmentRepository;

    final
    GuestRepository guestRepository;

    final
    EmailServiceImpl emailService;

    final
    HouseRepository houseRepository;

    final
    AssociationNameRepository associationNameRepository;

    final
    ContactPersonRepository contactPersonRepository;

    final
    GuestRegisterRepository guestRegisterRepository;

    final
    OrganizationRepository organizationRepository;

    final
    ExternLokalRepository externLokalRepository;

    final
    GuestFlatRepository guestFlatRepository;

    final
    LaundryRepository laundryRepository;

    final
    ParkingRepository parkingRepository;

    final
    PartyPlaceRepository partyPlaceRepository;

    final
    PoolRepository poolRepository;
    final StorageService storageService;

    public AdminSaveObjectController(AcceptOrganizationUpdateRepository acceptOrganizationUpdateRepository, ApartmentRepository apartmentRepository, GuestRepository guestRepository, EmailServiceImpl emailService, HouseRepository houseRepository, AssociationNameRepository associationNameRepository, ContactPersonRepository contactPersonRepository, GuestRegisterRepository guestRegisterRepository, OrganizationRepository organizationRepository, ExternLokalRepository externLokalRepository, GuestFlatRepository guestFlatRepository, LaundryRepository laundryRepository, ParkingRepository parkingRepository, PartyPlaceRepository partyPlaceRepository, PoolRepository poolRepository, StorageService storageService) {
        this.acceptOrganizationUpdateRepository = acceptOrganizationUpdateRepository;
        this.apartmentRepository = apartmentRepository;
        this.guestRepository = guestRepository;
        this.emailService = emailService;
        this.houseRepository = houseRepository;
        this.associationNameRepository = associationNameRepository;
        this.contactPersonRepository = contactPersonRepository;
        this.guestRegisterRepository = guestRegisterRepository;
        this.organizationRepository = organizationRepository;
        this.externLokalRepository = externLokalRepository;
        this.guestFlatRepository = guestFlatRepository;
        this.laundryRepository = laundryRepository;
        this.parkingRepository = parkingRepository;
        this.partyPlaceRepository = partyPlaceRepository;
        this.poolRepository = poolRepository;
        this.storageService = storageService;
    }


    @PostMapping("/association")
    public ResponseEntity<?> saveAssociation(@Valid @RequestBody SaveAssociationRequest saveAssociationRequest) {
        AssociationName association = associationNameRepository.getOne(saveAssociationRequest.getAssociation().getId());
        association.setAssociationName(saveAssociationRequest.getAssociationName());
        associationNameRepository.save(association);

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/house")
    public ResponseEntity<?> saveHouse(@Valid @RequestBody SaveHouseRequest saveHouseRequest) {
        House house = houseRepository.getOne(saveHouseRequest.getHouseId());
        house.setCity(saveHouseRequest.getCity());
        house.setStreet(saveHouseRequest.getStreet());
        house.setZipCode(saveHouseRequest.getZipCode());
        houseRepository.save(house);

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/contact")
    public ResponseEntity<?> saveContact(@Valid @RequestBody SaveContactRequest saveContactRequest) {
        ContactPerson contactPerson = contactPersonRepository.getOne(saveContactRequest.getContactId());
        contactPerson.setContactEmail(saveContactRequest.getContactEmail());
        contactPerson.setContactName(saveContactRequest.getContactName());
        contactPerson.setContactTelephone(saveContactRequest.getContactTelephone());
        contactPersonRepository.save(contactPerson);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    @PostMapping(value = "/protocol",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> saveContact(@RequestPart("file") @Valid @NotNull @NotBlank @RequestParam MultipartFile file,
                                         @RequestPart ("properties") @Valid UpdateProtocolRequest updateProtocolRequest) {
        String filename = "organisation_"+updateProtocolRequest.getId()+"_ÅrsProtokoll";
        storageService.saveAs(file,filename);
        return ResponseEntity.ok().body(new ApiResponse(true, "Protocol was updated"));
    }

    @PostMapping("/apartment")
    public ResponseEntity<?> saveApartment(@Valid @RequestBody SaveApartmentRequest saveApartmentRequest) {
        Apartment apartment = apartmentRepository.getOne(saveApartmentRequest.getApartmentId());
        apartment.setRoomAndKitchen(saveApartmentRequest.getRoomAndKitchen());
        apartment.setNumber(saveApartmentRequest.getNumber());
        apartment.setArea(saveApartmentRequest.getArea());
        apartmentRepository.save(apartment);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/guest")
    public ResponseEntity<?> saveApartment(@Valid @RequestBody SaveGuestRequest saveGuestRequest) {
        Guest guest = guestRepository.getOne(saveGuestRequest.getGuestId());
        guest.setEmail(saveGuestRequest.getEmail());
        guestRepository.save(guest);
        return ResponseEntity.ok().body(new ApiResponse(true, "Guest was saved"));
    }

    @PostMapping("/declinedOrganization")
    public ResponseEntity<?> saveDeclinedOrganization(@Valid @RequestBody SaveOrganizationRequest saveOrganizationRequest) {
        Organization organization = organizationRepository.getOne(saveOrganizationRequest.getId());
        organization.setTotalArea(saveOrganizationRequest.getTotalArea());
        organization.setOrgNumber(saveOrganizationRequest.getOrgNumber());
        organization.setNumberOfApartments(saveOrganizationRequest.getNumberOfApartments());
        organization.setActivated(false);
        organization.setDeclined(false);
        organizationRepository.save(organization);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organization was saved"));
    }
    @PostMapping("/notActivatedOrganization")
    public ResponseEntity<?> saveNotActivatedOrganization(@Valid @RequestBody SaveOrganizationRequest saveOrganizationRequest) {
        Organization organization = organizationRepository.getOne(saveOrganizationRequest.getId());
        organization.setTotalArea(saveOrganizationRequest.getTotalArea());
        organization.setOrgNumber(saveOrganizationRequest.getOrgNumber());
        organization.setNumberOfApartments(saveOrganizationRequest.getNumberOfApartments());
        organizationRepository.save(organization);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organization was saved"));
    }

    @PostMapping("/activatedOrganization")
    public ResponseEntity<?> saveActivated(@Valid @RequestBody SaveOrganizationRequest saveOrganizationRequest) {
        Organization organization = organizationRepository.getOne(saveOrganizationRequest.getId());
        AcceptOrganizationUpdate acceptOrganizationUpdate = new AcceptOrganizationUpdate();
        acceptOrganizationUpdate.setOldOrganizationNumber(organization.getOrgNumber());
        acceptOrganizationUpdate.setOldNumberOfApartments(organization.getNumberOfApartments());
        acceptOrganizationUpdate.setOldTotalArea(organization.getTotalArea());
        boolean updated = false;
        if (organization.getOrgNumber().equals(saveOrganizationRequest.getOrgNumber())) {
            acceptOrganizationUpdate.setNewOrganizationNumber(organization.getOrgNumber());
        } else {
            acceptOrganizationUpdate.setNewOrganizationNumber(saveOrganizationRequest.getOrgNumber());
            updated = true;
        }
        if (organization.getNumberOfApartments() == saveOrganizationRequest.getNumberOfApartments()) {
            acceptOrganizationUpdate.setNewNumberOfApartments(organization.getNumberOfApartments());
        } else {
            acceptOrganizationUpdate.setNewNumberOfApartments(saveOrganizationRequest.getNumberOfApartments());
            updated = true;
        }
        if (organization.getTotalArea() == saveOrganizationRequest.getTotalArea()) {
            acceptOrganizationUpdate.setNewTotalArea(organization.getTotalArea());

        } else {
            acceptOrganizationUpdate.setNewTotalArea(saveOrganizationRequest.getTotalArea());
            updated = true;
        }
        if (updated){
            acceptOrganizationUpdate.setOrganizationId(saveOrganizationRequest.getId());
            acceptOrganizationUpdateRepository.save(acceptOrganizationUpdate);
            return ResponseEntity.ok().body(new ApiResponse(true, "Organization updates was saved. Wait for accept"));
        }
        else {
            return ResponseEntity.ok().body(new ApiResponse(false, "Nothing was changed"));
        }
    }


    @PostMapping("/sendMailToGuest")
    public ResponseEntity<?> sendMailToMember(@Valid @RequestBody MailRequest mailRequest) {
        Guest guest = guestRepository.getOne(mailRequest.getGuestId());
        System.out.println(guest);
        String address = guest.getApartment().getHouse().getStreet();
        System.out.println("Address:" + address);
        int number = guest.getApartment().getNumber();
        int area = guest.getApartment().getArea();
        int roomAndKitchen = guest.getApartment().getRoomAndKitchen();
        System.out.println(number + " " + " " + area + " " + roomAndKitchen);
        if (guest.getGuestRegister() != null) {
            System.out.println("exists");
            GuestRegister guestRegister = guestRegisterRepository.findByGuestId(guest.getId());
            String to = guest.getEmail();
            String subject = "Testing from Spring Boot";
            String text = "localhost:3000/guestRegister/" + guestRegister.getUniqueKey();
            emailService.sendSimpleMessage(to, subject, text);
        } else {
            System.out.println("createGuest");
            GuestRegister guestRegister = new GuestRegister(address, number, area, roomAndKitchen);
            guestRegisterRepository.save(guestRegister);
            guest.setGuestRegister(guestRegister);
            guestRepository.save(guest);
            String to = guest.getEmail();
            String subject = "Testing from Spring Boot";
            String text = "localhost:3000/guestRegister/" + guestRegister.getUniqueKey();
            emailService.sendSimpleMessage(to, subject, text);
        }
        return ResponseEntity.ok().body(new ApiResponse(true, "Mail was send"));
    }

    @PostMapping("/settings")
    public ResponseEntity<?> saveSettings(@Valid @RequestBody LoanSettingsRequest saveSettingsRequest) {
        Long orgId = saveSettingsRequest.getOrganisationId();

        ExternLokalSettings externLokalSettings = externLokalRepository.findByOrganizationId(orgId);

        externLokalSettings.setActivated(saveSettingsRequest.isExternLokal());

        GuestFlatSettings guestFlatSettings = guestFlatRepository.findByOrganizationId(orgId);
        guestFlatSettings.setActivated(saveSettingsRequest.isGuestFlat());

        LaundrySettings laundrySettings = laundryRepository.findByOrganizationId(orgId);
        laundrySettings.setActivated(saveSettingsRequest.isLaundry());

        ParkingSettings parkingSettings = parkingRepository.findByOrganizationId(orgId);
        parkingSettings.setActivated(saveSettingsRequest.isParking());

        PartyPlaceSettings partyPlaceSettings = partyPlaceRepository.findByOrganizationId(orgId);
        partyPlaceSettings.setActivated(saveSettingsRequest.isPartyPlace());

        PoolSettings poolSettings = poolRepository.findByOrganizationId(orgId);
        poolSettings.setActivated(saveSettingsRequest.isPool());

        externLokalRepository.save(externLokalSettings);
        guestFlatRepository.save(guestFlatSettings);
        laundryRepository.save(laundrySettings);
        parkingRepository.save(parkingSettings);
        partyPlaceRepository.save(partyPlaceSettings);
        poolRepository.save(poolSettings);

        return ResponseEntity.ok().body(new ApiResponse(true, "Settings was saved"));
    }

}
