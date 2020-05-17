package se.foreningsdialog.forening.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.foreningsdialog.forening.models.AcceptOrganizationUpdate;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.payload.organization.AcceptOrganizationRequest;
import se.foreningsdialog.forening.payload.organization.AcceptOrganizationResponse;
import se.foreningsdialog.forening.payload.organization.OrganizationResponse;
import se.foreningsdialog.forening.repository.AcceptOrganizationUpdateRepository;
import se.foreningsdialog.forening.repository.OrganizationRepository;
import se.foreningsdialog.forening.service.OrganizationService;
import se.foreningsdialog.forening.storage.StorageService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/mainAdmin")
public class MainAdminController {

    final
    OrganizationRepository organizationRepository;

    final OrganizationService organizationService;

    final StorageService storageService;

    final AcceptOrganizationUpdateRepository acceptOrganizationUpdateRepository;

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
        List<AcceptOrganizationResponse> acceptOrganizationResponseList = new ArrayList<>();
        List<AcceptOrganizationUpdate> acceptOrganizationUpdateList = acceptOrganizationUpdateRepository.findAll();
        for (AcceptOrganizationUpdate acceptOrganizationUpdate : acceptOrganizationUpdateList) {

            AcceptOrganizationResponse acceptOrganizationResponse = new AcceptOrganizationResponse();
            acceptOrganizationResponse.setOrganizationId(acceptOrganizationUpdate.getOrganizationId());

            acceptOrganizationResponse.setOldNumberOfApartments(acceptOrganizationUpdate.getOldNumberOfApartments());
            acceptOrganizationResponse.setNewNumberOfApartments(acceptOrganizationUpdate.getNewNumberOfApartments());

            acceptOrganizationResponse.setOldTotalArea(acceptOrganizationUpdate.getOldTotalArea());
            acceptOrganizationResponse.setNewTotalArea(acceptOrganizationUpdate.getNewTotalArea());

            acceptOrganizationResponse.setOldOrganizationNumber(acceptOrganizationUpdate.getOldOrganizationNumber());
            acceptOrganizationResponse.setNewOrganizationNumber(acceptOrganizationUpdate.getNewOrganizationNumber());

            acceptOrganizationResponse.setAcceptId(acceptOrganizationUpdate.getId());

            acceptOrganizationResponseList.add(acceptOrganizationResponse);

        }
        return acceptOrganizationResponseList;
    }


    @PostMapping("/acceptOrganization")
    public ResponseEntity<?> acceptOrganization(@Valid @RequestBody AcceptOrganizationRequest acceptOrganizationRequest) {
        Organization organization = organizationRepository.getOne(acceptOrganizationRequest.getOrganizationId());
        organization.setActivated(true);
        organizationRepository.save(organization);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisation var bekräftad"));
    }
    @PostMapping("/acceptOrganizationUpdate")
    public ResponseEntity<?> acceptOrganizationUpdate(@Valid @RequestBody AcceptOrganizationRequest acceptOrganizationRequest) {
        System.out.println(acceptOrganizationRequest);
        Organization organization = organizationRepository.getOne(acceptOrganizationRequest.getOrganizationId());
        organization.setTotalArea(acceptOrganizationRequest.getNewTotalArea());
        organization.setOrgNumber(acceptOrganizationRequest.getNewOrganizationNumber());
        organization.setNumberOfApartments(acceptOrganizationRequest.getNewNumberOfApartments());
        organizationRepository.save(organization);
        AcceptOrganizationUpdate acceptOrganizationUpdate = acceptOrganizationUpdateRepository.getOne(acceptOrganizationRequest.getAcceptId());
        acceptOrganizationUpdateRepository.delete(acceptOrganizationUpdate);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisation var updaterad"));
    }

    @PostMapping("/declineOrganization")
    public ResponseEntity<?> declineOrganization(@Valid @RequestBody AcceptOrganizationRequest acceptOrganizationRequest) {
        Organization organization = organizationRepository.getOne(acceptOrganizationRequest.getOrganizationId());
        organization.setDeclined(true);
        organizationRepository.save(organization);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisation var neckat"));
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
