package se.foreningsdialog.forening.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.exception.BadRequestException;
import se.foreningsdialog.forening.exception.ResourceNotFoundException;
import se.foreningsdialog.forening.models.Association;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.payload.AssociationResponse;
import se.foreningsdialog.forening.payload.OrganizationResponse;
import se.foreningsdialog.forening.payload.PagedResponse;
import se.foreningsdialog.forening.repository.AssociationRepository;
import se.foreningsdialog.forening.repository.OrganizationRepository;
import se.foreningsdialog.forening.repository.UserRepository;
import se.foreningsdialog.forening.security.UserPrincipal;
import se.foreningsdialog.forening.util.AppConstants;
import se.foreningsdialog.forening.util.ModelMapper;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class OrganizationService {
    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    UserRepository userRepository;

//    public PagedResponse<OrganizationResponse> getAllOrganizations(UserPrincipal currentUser, int page, int size) {
//        validatePageNumberAndSize(page, size);
//
//        // Retrieve Polls
//        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
//        Page<Association> associations = associationRepository.findAll(pageable);
//
//        if(associations.getNumberOfElements() == 0) {
//            return new PagedResponse<>(Collections.emptyList(), associations.getNumber(),
//                    associations.getSize(), associations.getTotalElements(), associations.getTotalPages(), associations.isLast());
//        }
//
//        // Map Polls to PollResponses containing vote counts and poll creator details
//        List<Long> pollIds = associations.map(Association::getId).getContent();
//        Map<Long, User> creatorMap = getPollCreatorMap(associations.getContent());
//
//        List<AssociationResponse> associationResponses = associations.map(association -> {
//            return ModelMapper.mapPollToPollResponse(association,
//                    creatorMap.get(currentUser.getId()));
//        }).getContent();
//
//        return new PagedResponse<>(associationResponses, associations.getNumber(),
//                associations.getSize(), associations.getTotalElements(), associations.getTotalPages(), associations.isLast());
//    }
    public PagedResponse<OrganizationResponse> getOrganizationsCreatedBy(String username, UserPrincipal currentUser, int page, int size) {
        validatePageNumberAndSize(page, size);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        // Retrieve all organizations created by the given username
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Organization> organizations = organizationRepository.findByCreatedBy(user.getId(), pageable);

        if (organizations.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), organizations.getNumber(),
                    organizations.getSize(), organizations.getTotalElements(), organizations.getTotalPages(), organizations.isLast());
        }

        List<OrganizationResponse> organizationsResponses = organizations.map(organization -> {
            return ModelMapper.mapOrganizationResponse(organization,
                    user);
        }).getContent();
        return new PagedResponse<>(organizationsResponses, organizations.getNumber(),
                organizations.getSize(), organizations.getTotalElements(), organizations.getTotalPages(), organizations.isLast());
    }
    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
    Map<Long, User> getPollCreatorMap(List<Association> associations) {
        List<Long> creatorIds = associations.stream()
                .map(Association::getCreatedBy)
                .distinct()
                .collect(Collectors.toList());

        List<User> creators = userRepository.findByIdIn(creatorIds);
        Map<Long, User> creatorMap = creators.stream()
                .collect(Collectors.toMap(User::getId, Function.identity()));

        return creatorMap;
    }
}
