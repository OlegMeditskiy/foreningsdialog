package se.foreningsdialog.forening.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import se.foreningsdialog.forening.services.OrganizationRepoService;

@CrossOrigin(origins = "https://localhost:3000")
@RestController
public class OrganizationController {

    @Autowired
    OrganizationRepoService organizationRepoService;

}
