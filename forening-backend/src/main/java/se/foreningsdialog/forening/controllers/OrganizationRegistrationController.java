package se.foreningsdialog.forening.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.repository.OrganizationRepo;

@RestController
public class OrganizationRegistrationController {

    private final Logger log = LoggerFactory.getLogger(OrganizationRegistrationController.class);

    @Autowired
    OrganizationRepo organizationRepo;


    @PostMapping("/registerOrganization")
    public  ResponseEntity<Organization> createOrganization(
            @RequestBody Organization organization
    ) {
        log.info("Request to create organization: {}", organization);
        Organization result = organizationRepo.save(organization);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
