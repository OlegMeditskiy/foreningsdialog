package se.foreningsdialog.forening.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import se.foreningsdialog.forening.payload.AssociationResponse;
import se.foreningsdialog.forening.payload.PagedResponse;
import se.foreningsdialog.forening.repository.AssociationRepository;
import se.foreningsdialog.forening.security.CurrentUser;
import se.foreningsdialog.forening.security.UserPrincipal;
import se.foreningsdialog.forening.service.AssociationService;
import se.foreningsdialog.forening.util.AppConstants;

@RestController
@RequestMapping("/api/associations")
public class AssociationController {
    @Autowired
    private AssociationRepository associationRepository;


    @Autowired
    private AssociationService associationService;

    @GetMapping
    private PagedResponse<AssociationResponse> getAssociations(@CurrentUser UserPrincipal currentUser,
                                                              @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                              @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size){
            return associationService.getAllAssociations(currentUser,page,size);
    }


}
