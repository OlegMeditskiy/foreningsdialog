package se.foreningsdialog.forening.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import se.foreningsdialog.forening.models.*;
import se.foreningsdialog.forening.models.houses.Apartment;
import se.foreningsdialog.forening.models.houses.Guest;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.models.loanobjects.*;
import se.foreningsdialog.forening.payload.DocumentTypeRequest;
import se.foreningsdialog.forening.payload.DocumentTypeResponse;
import se.foreningsdialog.forening.payload.NewsRequest;
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
import se.foreningsdialog.forening.payload.guestRegister.GuestRegisterResponse;
import se.foreningsdialog.forening.payload.house.DeleteHouseRequest;
import se.foreningsdialog.forening.payload.house.NewHouseRequest;
import se.foreningsdialog.forening.payload.house.SaveHouseRequest;
import se.foreningsdialog.forening.payload.loanSettings.LoanSettingsRequest;
import se.foreningsdialog.forening.payload.organization.NewOrganisationsRequest;
import se.foreningsdialog.forening.repository.*;
import se.foreningsdialog.forening.repository.loanObjects.*;
import se.foreningsdialog.forening.service.GuestService;
import se.foreningsdialog.forening.storage.StorageFileNotFoundException;
import se.foreningsdialog.forening.storage.StorageService;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/associationAdmin")
public class AssociationAdminController {

    final
    AuthenticationManager authenticationManager;

    private final JavaMailSender javaMailSender;

    final
    UserRepository userRepository;

    final
    RoleRepository roleRepository;

    final
    ApartmentRepository apartmentRepository;

    final
    GuestRepository guestRepository;

    final
    EmailServiceImpl emailService;

    final
    OrganizationRepository organizationRepository;

    final
    HouseRepository houseRepository;

    final
    AssociationNameRepository associationNameRepository;

    final
    ContactPersonRepository contactPersonRepository;

    final
    GuestRegisterRepository guestRegisterRepository;

    final
    GuestService guestService;

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

    final
    NewsRepository newsRepository;

    final StorageService storageService;

    final
    DocumentTypeRepository documentTypeRepository;

    @Autowired
    public AssociationAdminController(JavaMailSender javaMailSender, AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, GuestService guestService, ApartmentRepository apartmentRepository, GuestRegisterRepository guestRegisterRepository, GuestRepository guestRepository, EmailServiceImpl emailService, OrganizationRepository organizationRepository, HouseRepository houseRepository, AssociationNameRepository associationNameRepository, ContactPersonRepository contactPersonRepository, ExternLokalRepository externLokalRepository, GuestFlatRepository guestFlatRepository, LaundryRepository laundryRepository, ParkingRepository parkingRepository, PartyPlaceRepository partyPlaceRepository, PoolRepository poolRepository, NewsRepository newsRepository, StorageService storageService, DocumentTypeRepository documentTypeRepository) {
        this.javaMailSender = javaMailSender;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.guestService = guestService;
        this.apartmentRepository = apartmentRepository;
        this.guestRegisterRepository = guestRegisterRepository;
        this.guestRepository = guestRepository;
        this.emailService = emailService;
        this.organizationRepository = organizationRepository;
        this.houseRepository = houseRepository;
        this.associationNameRepository = associationNameRepository;
        this.contactPersonRepository = contactPersonRepository;
        this.externLokalRepository = externLokalRepository;
        this.guestFlatRepository = guestFlatRepository;
        this.laundryRepository = laundryRepository;
        this.parkingRepository = parkingRepository;
        this.partyPlaceRepository = partyPlaceRepository;
        this.poolRepository = poolRepository;
        this.newsRepository = newsRepository;
        this.storageService = storageService;
        this.documentTypeRepository = documentTypeRepository;
    }


    @PostMapping("/createOrganizations")
    public ResponseEntity<?> registerUser(@Valid @RequestBody NewOrganisationsRequest signUpRequest) {
        System.out.println(signUpRequest);
        //Creating new Organizations
        for (Organization organization: signUpRequest.getAssociation().getOrganizations()){
            for(AssociationName associationName: organization.getAssociations()){
//
                associationName.setCreatedBy(signUpRequest.getUserId());
//
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
        AssociationName association = associationNameRepository.findById(saveAssociationRequest.getAssociation().getId()).orElse(null);
        System.out.println(saveAssociationRequest.getAssociationName());
        association.setAssociationName(saveAssociationRequest.getAssociationName());
        associationNameRepository.save(association);

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    @PostMapping("/createAssociation")
    public ResponseEntity<?> createAssociation(@Valid @RequestBody NewAssociationRequest newAssociationRequest) {

        Organization organization = organizationRepository.findById(newAssociationRequest.getOrganizationId()).orElse(null);
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
        Organization organization = organizationRepository.findById(deleteAssociationRequest.getOrganizationId()).orElse(null);
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
        House house = houseRepository.findById(saveHouseRequest.getHouseId()).orElse(null);
        house.setCity(saveHouseRequest.getCity());
        house.setStreet(saveHouseRequest.getStreet());
        house.setZipCode(saveHouseRequest.getZipCode());
        houseRepository.save(house);

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/createHouse")
    public ResponseEntity<?> createHouse(@Valid @RequestBody NewHouseRequest newHouseRequest) {
        System.out.println("Create house: "+newHouseRequest);
        AssociationName association = associationNameRepository.findById(newHouseRequest.getAssociationId()).orElse(null);
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
        AssociationName association = associationNameRepository.findById(deleteHouseRequest.getAssociationId()).orElse(null);
        House house = houseRepository.findById(deleteHouseRequest.getHouseId()).orElse(null);
        association.getHouses().remove(house);
        house.setAssociationName(null);
        associationNameRepository.save(association);
        houseRepository.delete(house);

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    @PostMapping("/saveContact")
    public ResponseEntity<?> saveContact(@Valid @RequestBody SaveContactRequest saveContactRequest) {
        ContactPerson contactPerson = contactPersonRepository.findById(saveContactRequest.getContactId()).orElse(null);
        contactPerson.setContactEmail(saveContactRequest.getContactEmail());
        contactPerson.setContactName(saveContactRequest.getContactName());
        contactPerson.setContactTelephone(saveContactRequest.getContactTelephone());
        contactPersonRepository.save(contactPerson);

        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/createContact")
    public ResponseEntity<?> createContact(@Valid @RequestBody NewContactRequest newContactRequest) {
        AssociationName association = associationNameRepository.findById(newContactRequest.getAssociationId()).orElse(null);
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
        AssociationName association = associationNameRepository.findById(deleteContactRequest.getAssociationId()).orElse(null);
        ContactPerson contactPerson = contactPersonRepository.findById(deleteContactRequest.getContactId()).orElse(null);
        association.getContacts().remove(contactPerson);
        contactPerson.setAssociationName(null);
        associationNameRepository.save(association);
        contactPersonRepository.delete(contactPerson);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/saveApartment")
    public ResponseEntity<?> saveApartment(@Valid @RequestBody SaveApartmentRequest saveApartmentRequest) {
        Apartment apartment = apartmentRepository.findById(saveApartmentRequest.getApartmentId()).orElse(null);
        apartment.setRoomAndKitchen(saveApartmentRequest.getRoomAndKitchen());
        apartment.setNumber(saveApartmentRequest.getNumber());
        apartment.setArea(saveApartmentRequest.getArea());
        apartmentRepository.save(apartment);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/createApartment")
    public ResponseEntity<?> createApartment(@Valid @RequestBody NewApartmentRequest newApartmentRequest) {
        House house = houseRepository.findById(newApartmentRequest.getHouseId()).orElse(null);
        System.out.println(newApartmentRequest);
        Apartment apartment = new Apartment(newApartmentRequest.getNumber(),newApartmentRequest.getRoomAndKitchen(),newApartmentRequest.getArea(),house);
        apartmentRepository.save(apartment);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    @DeleteMapping("/deleteApartment")
    @Transactional
    public ResponseEntity<?> deleteApartment(@Valid @RequestBody DeleteApartmentRequest deleteApartmentRequest) {
        House house = houseRepository.findById(deleteApartmentRequest.getHouseId()).orElse(null);
        Apartment apartment = apartmentRepository.findById(deleteApartmentRequest.getApartmentId()).orElse(null);
        house.getApartments().remove(apartment);
        apartment.setHouse(null);
        houseRepository.save(house);
        apartmentRepository.delete(apartment);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/saveGuest")
    public ResponseEntity<?> saveApartment(@Valid @RequestBody SaveGuestRequest saveGuestRequest) {
        Guest guest = guestRepository.findById(saveGuestRequest.getGuestId()).orElse(null);
        guest.setEmail(saveGuestRequest.getEmail());
        guestRepository.save(guest);
        String address= guest.getApartment().getHouse().getStreet();
        int number=guest.getApartment().getNumber();
                int area= guest.getApartment().getArea();
                        int roomAndKitchen=guest.getApartment().getRoomAndKitchen();

        if (guest.getGuestRegister()!=null){
            GuestRegister guestRegister = guestRegisterRepository.findByGuestId(guest.getId());
            String to = "forening@forening.com";
            String subject = "Testing from Spring Boot";
            String text="forening.com:3000/guestRegister/"+guestRegister.getUniqueKey();
            emailService.sendSimpleMessage(to,subject,text);
        }
        else {
            GuestRegister guestRegister = new GuestRegister(address,number,area,roomAndKitchen);
            guestRegister.setGuest(guest);
            guestRegisterRepository.save(guestRegister);
            guest.setGuestRegister(guestRegister);
            guestRepository.save(guest);
            String to = "forening@forening.com";
            String subject = "Testing from Spring Boot";
            String text="forening.com:3000/guestRegister/"+guestRegister.getUniqueKey();
            emailService.sendSimpleMessage(to,subject,text);
        }



        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @PostMapping("/createGuest")
    public ResponseEntity<?> createApartment(@Valid @RequestBody NewGuestRequest newGuestRequest) {
        Apartment apartment = apartmentRepository.findById(newGuestRequest.getApartmentId()).orElse(null);
        Guest guest = new Guest();
        guest.setEmail(newGuestRequest.getEmail());
        guest.setApartment(apartment);
        guestRepository.save(guest);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    @DeleteMapping("/deleteGuest")
    @Transactional
    public ResponseEntity<?> deleteApartment(@Valid @RequestBody DeleteGuestRequest deleteGuestRequest) {
        Apartment apartment = apartmentRepository.findById(deleteGuestRequest.getApartmentId()).orElse(null);
        Guest guest = guestRepository.findById(deleteGuestRequest.getGuestId()).orElse(null);
        apartment.getGuests().remove(guest);
        guest.setApartment(null);
        apartmentRepository.save(apartment);
        guestRepository.delete(guest);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }

    @GetMapping("/getGuestRegister/{uniqueKey}")
    public GuestRegisterResponse getGuestRegister(@PathVariable(value = "uniqueKey") UUID uniqueKey) {

        return guestService.getGuestRegister(uniqueKey);
    }

    @PostMapping("saveSettings")
    public ResponseEntity<?> saveSettings(@Valid @RequestBody LoanSettingsRequest saveSettingsRequest){
        Long orgId = saveSettingsRequest.getOrganisationId();

        System.out.println(saveSettingsRequest.toString());

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


    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadFile(@RequestParam MultipartFile file) {
        System.out.println("Upload");
        storageService.store(file);
//        logger.info(String.format("File name '%s' uploaded successfully.", file.getOriginalFilename()));

        return ResponseEntity.ok().build();
    }
    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }
    @PostMapping("/createNews")
    public ResponseEntity<?> createNews(@Valid @RequestBody NewsRequest newsRequest){
        News news = new News();
        news.setNewsText(newsRequest.getNewsText());
        news.setNewsTitle(newsRequest.getNewsTitle());
        newsRepository.save(news);
        return ResponseEntity.ok().body(new ApiResponse(true, "Nyhet var skapad."));
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @GetMapping("/getAllFiles")
    public List<?> listUploadedFiles() {

        return storageService.loadAll().map(
                path -> MvcUriComponentsBuilder.fromMethodName(AssociationAdminController.class,
                        "serveFile", path.getFileName().toString()).build().toUri().toString())
                .collect(Collectors.toList());
    }

    @PostMapping("/createDocumentType")
    public ResponseEntity<?> createDocumentType(@Valid @RequestBody DocumentTypeRequest documentTypeRequest){
        AssociationName associationName = associationNameRepository.findById(documentTypeRequest.getAssociationNameId()).orElse(null);
        DocumentType documentType = new DocumentType();
        documentType.setAssociationName(associationName);
        documentType.setTypeName(documentTypeRequest.getTypeName());
        documentTypeRepository.save(documentType);
        return ResponseEntity.ok().body(new ApiResponse(true, "Dokument typ var skapad."));
    }


}
