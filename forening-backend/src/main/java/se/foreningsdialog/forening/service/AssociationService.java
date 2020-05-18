package se.foreningsdialog.forening.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import se.foreningsdialog.forening.exception.ResourceNotFoundException;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.payload.association.AssociationNameResponse;
import se.foreningsdialog.forening.payload.association.DeleteAssociationRequest;
import se.foreningsdialog.forening.payload.association.NewAssociationRequest;
import se.foreningsdialog.forening.payload.association.SaveAssociationRequest;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.repository.AssociationNameRepository;
import se.foreningsdialog.forening.repository.OrganizationRepository;
import se.foreningsdialog.forening.repository.UserRepository;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssociationService {
    private final
    UserRepository userRepository;

    private final
    AssociationNameRepository associationNameRepository;

    private final
    OrganizationRepository organizationRepository;

    public AssociationService(UserRepository userRepository, AssociationNameRepository associationNameRepository, OrganizationRepository organizationRepository) {
        this.userRepository = userRepository;
        this.associationNameRepository = associationNameRepository;
        this.organizationRepository = organizationRepository;
    }

    public AssociationNameResponse getAssociationCreatedBy(String username, Long associationId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        AssociationName associationName = associationNameRepository.getOne(associationId);

        AssociationNameResponse associationNameResponse = new AssociationNameResponse();
        if (associationName.getCreatedBy().equals(user.getId())) {
            associationNameResponse.setAssociationName(associationName.getAssociationName());
            associationNameResponse.setId(associationName.getId());
            associationNameResponse.setLogo(associationName.getLogo());
            associationNameResponse.setOrganizationId(associationName.getOrganization().getId());
            List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
                    new SimpleGrantedAuthority(role.getName().name())
            ).collect(Collectors.toList());
            try {
                associationNameResponse.setHouses(associationName.getHouses());
                associationNameResponse.setContacts(associationName.getContacts());
                associationNameResponse.setEvents(associationName.getEvents());
                associationNameResponse.setNews(associationName.getNews());
                associationNameResponse.setDocumentTypes(associationName.getDocumentTypes());
            } catch (Exception ex) {
                System.out.println(ex);
            }

        }
        return associationNameResponse;
    }

    public ResponseEntity<?> createAssociation(@Valid @RequestBody NewAssociationRequest newAssociationRequest) {
        Organization organization = organizationRepository.getOne(newAssociationRequest.getOrganizationId());
        AssociationName association = new AssociationName();
        association.setOrganization(organization);
        association.setAssociationName(newAssociationRequest.getAssociationName());
        association.setCreatedBy(newAssociationRequest.getUserId());
        associationNameRepository.save(association);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    public ResponseEntity<?> deleteAssociation(DeleteAssociationRequest deleteAssociationRequest) {
        AssociationName associationName = deleteAssociationRequest.getAssociation();
        associationName.setOrganization(null);
        associationNameRepository.delete(associationName);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    public ResponseEntity<?> saveAssociation(SaveAssociationRequest saveAssociationRequest) {
        AssociationName association = associationNameRepository.getOne(saveAssociationRequest.getAssociation().getId());
        association.setAssociationName(saveAssociationRequest.getAssociationName());
        associationNameRepository.save(association);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
}
