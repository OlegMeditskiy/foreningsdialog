package se.foreningsdialog.forening.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.foreningsdialog.forening.payload.organization.AcceptOrganizationRequest;
import se.foreningsdialog.forening.payload.organization.AcceptOrganizationResponse;
import se.foreningsdialog.forening.payload.organization.OrganizationResponse;
import se.foreningsdialog.forening.repository.AcceptOrganizationUpdateRepository;
import se.foreningsdialog.forening.repository.OrganizationRepository;
import se.foreningsdialog.forening.service.OrganizationService;
import se.foreningsdialog.forening.storage.StorageService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/mainAdmin")
public class MainAdminController {

    private final
    OrganizationRepository organizationRepository;

    private final OrganizationService organizationService;

    private final StorageService storageService;

    private final AcceptOrganizationUpdateRepository acceptOrganizationUpdateRepository;


    public MainAdminController(OrganizationRepository organizationRepository, OrganizationService organizationService, StorageService storageService, AcceptOrganizationUpdateRepository acceptOrganizationUpdateRepository) {
        this.organizationRepository = organizationRepository;
        this.organizationService = organizationService;
        this.storageService = storageService;
        this.acceptOrganizationUpdateRepository = acceptOrganizationUpdateRepository;
    }

    @GetMapping("/allOrganisations")
    public List<OrganizationResponse> getOrganizationsCreatedBy() {
        return organizationService.getAllOrganizations();
    }

    @GetMapping("/acceptOrganizationUpdate")
    public List<AcceptOrganizationResponse> getUpdatedOrganizations() {
        return organizationService.getUpdatedOrganizations();
    }


    @PostMapping("/acceptOrganization")
    public ResponseEntity<?> acceptOrganization(@Valid @RequestBody AcceptOrganizationRequest acceptOrganizationRequest) {
        return organizationService.acceptOrganization(acceptOrganizationRequest);
    }
    @PostMapping("/acceptOrganizationUpdate")
    public ResponseEntity<?> acceptOrganizationUpdate(@Valid @RequestBody AcceptOrganizationRequest acceptOrganizationRequest) {
        return organizationService.acceptOrganizationUpdate(acceptOrganizationRequest);
    }

    @PostMapping("/declineOrganization")
    public ResponseEntity<?> declineOrganization(@Valid @RequestBody AcceptOrganizationRequest acceptOrganizationRequest) {
        return organizationService.declineOrganization(acceptOrganizationRequest);
    }

    @PostMapping(value = "/uploadVillkor", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadVillkor(@RequestParam MultipartFile file) {
        storageService.saveAs(file, "AllmännaVilkor");
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/uploadGDPR", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadGDPR(@RequestParam MultipartFile file) {
        storageService.saveAs(file, "GDPR");
        return ResponseEntity.ok().build();
    }
}
