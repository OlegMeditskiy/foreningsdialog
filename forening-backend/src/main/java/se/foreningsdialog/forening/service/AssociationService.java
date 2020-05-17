package se.foreningsdialog.forening.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.exception.BadRequestException;
import se.foreningsdialog.forening.exception.ResourceNotFoundException;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.payload.association.AssociationNameResponse;
import se.foreningsdialog.forening.repository.AssociationNameRepository;
import se.foreningsdialog.forening.repository.UserRepository;
import se.foreningsdialog.forening.util.AppConstants;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssociationService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    AssociationNameRepository associationNameRepository;

    public AssociationNameResponse getAssociationCreatedBy(String username, Long associationId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        AssociationName associationName = associationNameRepository.findById(associationId).get();

        AssociationNameResponse associationNameResponse = new AssociationNameResponse();
        if (associationName.getCreatedBy().equals(user.getId())) {
            associationNameResponse.setAssociationName(associationName.getAssociationName());
            associationNameResponse.setId(associationName.getId());
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

    private void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if (size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page ust not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
}
