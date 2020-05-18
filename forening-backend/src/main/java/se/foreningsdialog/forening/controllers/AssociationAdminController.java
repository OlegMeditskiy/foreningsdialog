package se.foreningsdialog.forening.controllers;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.ContactPerson;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.models.loanobjects.*;
import se.foreningsdialog.forening.payload.association.LogoUploadRequest;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.payload.guestRegister.GuestRegisterResponse;
import se.foreningsdialog.forening.payload.organization.NewOrganisationsRequest;
import se.foreningsdialog.forening.repository.AssociationNameRepository;
import se.foreningsdialog.forening.repository.ContactPersonRepository;
import se.foreningsdialog.forening.repository.HouseRepository;
import se.foreningsdialog.forening.repository.OrganizationRepository;
import se.foreningsdialog.forening.repository.loanObjects.*;
import se.foreningsdialog.forening.service.GuestService;
import se.foreningsdialog.forening.storage.StorageFileNotFoundException;
import se.foreningsdialog.forening.storage.StorageService;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/associationAdmin")
public class AssociationAdminController {

    private final
    OrganizationRepository organizationRepository;


    private final
    AssociationNameRepository associationNameRepository;

    private final
    GuestService guestService;


    private final StorageService storageService;

    private final
    ExternLokalRepository externLokalRepository;

    private final
    GuestFlatRepository guestFlatRepository;

    private final
    LaundryRepository laundryRepository;

    private final
    ParkingRepository parkingRepository;

    private final
    PartyPlaceRepository partyPlaceRepository;

    private final
    PoolRepository poolRepository;

    private final
    ContactPersonRepository contactPersonRepository;

    private final
    HouseRepository houseRepository;

    public AssociationAdminController(OrganizationRepository organizationRepository, AssociationNameRepository associationNameRepository, GuestService guestService, StorageService storageService, ExternLokalRepository externLokalRepository, GuestFlatRepository guestFlatRepository, LaundryRepository laundryRepository, ParkingRepository parkingRepository, PartyPlaceRepository partyPlaceRepository, PoolRepository poolRepository, ContactPersonRepository contactPersonRepository, HouseRepository houseRepository) {
        this.organizationRepository = organizationRepository;
        this.associationNameRepository = associationNameRepository;
        this.guestService = guestService;
        this.storageService = storageService;
        this.externLokalRepository = externLokalRepository;
        this.guestFlatRepository = guestFlatRepository;
        this.laundryRepository = laundryRepository;
        this.parkingRepository = parkingRepository;
        this.partyPlaceRepository = partyPlaceRepository;
        this.poolRepository = poolRepository;
        this.contactPersonRepository = contactPersonRepository;
        this.houseRepository = houseRepository;
    }


    @PostMapping("/createOrganizations")
    public ResponseEntity<?> createOrganizations(@Valid @RequestBody NewOrganisationsRequest signUpRequest) {
        //Creating new Organizations
        for (Organization organization : signUpRequest.getAssociation().getOrganizations()) {
            organization.setCreatedBy(signUpRequest.getUserId());
            organizationRepository.save(organization);

            ExternLokalSettings externLokal = new ExternLokalSettings();
            externLokal.setLoanType();
            externLokal.setOrganization(organization);
            externLokalRepository.save(externLokal);

            GuestFlatSettings guestFlatSettings = new GuestFlatSettings();
            guestFlatSettings.setOrganization(organization);
            guestFlatSettings.setLoanType();
            guestFlatRepository.save(guestFlatSettings);

            LaundrySettings laundrySettings = new LaundrySettings();
            laundrySettings.setOrganization(organization);
            laundrySettings.setLoanType();
            laundryRepository.save(laundrySettings);

            ParkingSettings parkingSettings = new ParkingSettings();
            parkingSettings.setOrganization(organization);
            parkingSettings.setLoanType();
            parkingRepository.save(parkingSettings);

            PartyPlaceSettings partyPlaceSettings = new PartyPlaceSettings();
            partyPlaceSettings.setOrganization(organization);
            partyPlaceSettings.setLoanType();
            partyPlaceRepository.save(partyPlaceSettings);

            PoolSettings poolSettings = new PoolSettings();
            poolSettings.setOrganization(organization);
            poolSettings.setLoanType();
            poolRepository.save(poolSettings);

            for (AssociationName associationName : organization.getAssociations()) {
                associationName.setOrganization(organization);
                associationName.setCreatedBy(signUpRequest.getUserId());
                associationNameRepository.save(associationName);
                for (ContactPerson contactPerson : associationName.getContacts()) {
                    contactPerson.setAssociationName(associationName);
                    contactPerson.setCreatedBy(signUpRequest.getUserId());
                    contactPersonRepository.save(contactPerson);
                }
                for (House house : associationName.getHouses()) {
                    house.setAssociationName(associationName);
                    house.setCreatedBy(signUpRequest.getUserId());
                    houseRepository.save(house);
                }
            }
        }


        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }


    @GetMapping("/getGuestRegister/{uniqueKey}")
    public GuestRegisterResponse getGuestRegister(@PathVariable(value = "uniqueKey") UUID uniqueKey) {

        return guestService.getGuestRegister(uniqueKey);
    }




    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
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

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadFile(@RequestParam MultipartFile file) {
        storageService.store(file);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/logoUpload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity logoUpload(
            @RequestPart("file") @Valid @NotNull @NotBlank  @RequestParam MultipartFile file,
            @RequestPart ("properties") @Valid LogoUploadRequest logoUploadRequest) {
        String filename = "association_"+logoUploadRequest.getAssociationId()+"_Logo";
        String logoURL = "http://localhost:8080/files/"+storageService.saveAsString(file,filename);
        AssociationName associationName = associationNameRepository.getOne(logoUploadRequest.getAssociationId());
        associationName.setLogo(logoURL);
        associationNameRepository.save(associationName);
        return ResponseEntity.ok().build();
    }



}
