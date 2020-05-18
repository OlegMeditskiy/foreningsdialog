package se.foreningsdialog.forening.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.exception.ResourceNotFoundException;
import se.foreningsdialog.forening.models.AcceptOrganizationUpdate;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.payload.association.DeleteDocumentTypeRequest;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.payload.common.UserSummary;
import se.foreningsdialog.forening.payload.organization.AcceptOrganizationRequest;
import se.foreningsdialog.forening.payload.organization.AcceptOrganizationResponse;
import se.foreningsdialog.forening.payload.organization.OrganizationResponse;
import se.foreningsdialog.forening.payload.organization.SaveOrganizationRequest;
import se.foreningsdialog.forening.repository.AcceptOrganizationUpdateRepository;
import se.foreningsdialog.forening.repository.OrganizationRepository;
import se.foreningsdialog.forening.repository.UserRepository;
import se.foreningsdialog.forening.storage.StorageService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrganizationService {
    private final OrganizationRepository organizationRepository;

    private final UserRepository userRepository;

    private final AcceptOrganizationUpdateRepository acceptOrganizationUpdateRepository;
    private final StorageService storageService;

    public OrganizationService(OrganizationRepository organizationRepository, UserRepository userRepository, AcceptOrganizationUpdateRepository acceptOrganizationUpdateRepository, StorageService storageService) {
        this.organizationRepository = organizationRepository;
        this.userRepository = userRepository;
        this.acceptOrganizationUpdateRepository = acceptOrganizationUpdateRepository;
        this.storageService = storageService;
    }

    //Organization admin service


    public List<OrganizationResponse> getAllOrganizationsCreatedBy(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        List<Organization> organizations = organizationRepository.findByCreatedBy(user.getId());
        List<OrganizationResponse> organizationResponses = new ArrayList<>();
        for (Organization organization : organizations) {
            OrganizationResponse organizationResponse = new OrganizationResponse();
            organizationResponse.setId(organization.getId());
            organizationResponse.setTotalArea(organization.getTotalArea());
            organizationResponse.setOrgNumber(organization.getOrgNumber());
            organizationResponse.setNumberOfApartments(organization.getNumberOfApartments());
            organizationResponse.setActivated(organization.isActivated());
            organizationResponse.setDeclined(organization.isDeclined());
            List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
                    new SimpleGrantedAuthority(role.getName().name())
            ).collect(Collectors.toList());
            try {
                organizationResponse.setAssociations(organization.getAssociations());
            } catch (Exception ex) {
                System.out.println(ex);
            }
            UserSummary creatorSummary = new UserSummary(user.getId(), user.getUsername(), authorities);
            organizationResponse.setCreatedBy(creatorSummary);
            organizationResponses.add(organizationResponse);
        }
        return organizationResponses;
    }

    public List<OrganizationResponse> getAllOrganizations() {
        List<Organization> organizations = organizationRepository.findAll();
        List<OrganizationResponse> organizationResponses = new ArrayList<>();
        for (Organization organization : organizations) {
            OrganizationResponse organizationResponse = new OrganizationResponse();
            organizationResponse.setId(organization.getId());
            organizationResponse.setTotalArea(organization.getTotalArea());
            organizationResponse.setOrgNumber(organization.getOrgNumber());
            organizationResponse.setNumberOfApartments(organization.getNumberOfApartments());
            organizationResponse.setActivated(organization.isActivated());
            organizationResponse.setDeclined(organization.isDeclined());
            try {
                organizationResponse.setAssociations(organization.getAssociations());
            } catch (Exception ex) {
                System.out.println(ex);
            }
            organizationResponses.add(organizationResponse);
        }
        return organizationResponses;
    }


    public OrganizationResponse getOrganizationCreatedBy(String username, Long organizationId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        Organization organization = organizationRepository.getOne(organizationId);
        OrganizationResponse organizationResponse = new OrganizationResponse();
        if (organization.getCreatedBy().equals(user.getId())) {
            organizationResponse.setId(organization.getId());
            organizationResponse.setTotalArea(organization.getTotalArea());
            organizationResponse.setOrgNumber(organization.getOrgNumber());
            organizationResponse.setNumberOfApartments(organization.getNumberOfApartments());
            organizationResponse.setActivated(organization.isActivated());
            organizationResponse.setDeclined(organization.isDeclined());
            List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
                    new SimpleGrantedAuthority(role.getName().name())
            ).collect(Collectors.toList());
            try {
                organizationResponse.setAssociations(organization.getAssociations());
                organizationResponse.setLoanObjects(organization.getLoanObjects());
            } catch (Exception ex) {
                System.out.println(ex);
            }
        }
        return organizationResponse;
    }

    public ResponseEntity<?> deleteOrganization(DeleteDocumentTypeRequest deleteDocumentTypeRequest) {
        Organization organization = organizationRepository.getOne(deleteDocumentTypeRequest.getId());
        organizationRepository.delete(organization);
        return ResponseEntity.ok().body(new ApiResponse(true, "Dokument was deleted"));
    }

    public ResponseEntity<?> saveDeclinedOrganization(SaveOrganizationRequest saveOrganizationRequest) {
        Organization organization = organizationRepository.getOne(saveOrganizationRequest.getId());
        organization.setTotalArea(saveOrganizationRequest.getTotalArea());
        organization.setOrgNumber(saveOrganizationRequest.getOrgNumber());
        organization.setNumberOfApartments(saveOrganizationRequest.getNumberOfApartments());
        organization.setActivated(false);
        organization.setDeclined(false);
        organizationRepository.save(organization);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organization was saved"));
    }
    public ResponseEntity<?> saveNotActivatedOrganization(SaveOrganizationRequest saveOrganizationRequest) {
        Organization organization = organizationRepository.getOne(saveOrganizationRequest.getId());
        organization.setTotalArea(saveOrganizationRequest.getTotalArea());
        organization.setOrgNumber(saveOrganizationRequest.getOrgNumber());
        organization.setNumberOfApartments(saveOrganizationRequest.getNumberOfApartments());
        organizationRepository.save(organization);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organization was saved"));
    }
    public ResponseEntity<?> saveActivated(SaveOrganizationRequest saveOrganizationRequest) {
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


    /*MAIN ADMIN SERVICE*/


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


    public ResponseEntity<?> acceptOrganization(AcceptOrganizationRequest acceptOrganizationRequest) {
        Organization organization = organizationRepository.getOne(acceptOrganizationRequest.getOrganizationId());
        organization.setActivated(true);
        organizationRepository.save(organization);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisation var bekräftad"));
    }
    public ResponseEntity<?> acceptOrganizationUpdate(AcceptOrganizationRequest acceptOrganizationRequest) {
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

    public ResponseEntity<?> declineOrganization(AcceptOrganizationRequest acceptOrganizationRequest) {
        Organization organization = organizationRepository.getOne(acceptOrganizationRequest.getOrganizationId());
        organization.setDeclined(true);
        organizationRepository.save(organization);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisation var neckat"));
    }


}
