package se.foreningsdialog.forening.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.repository.OrganizationRepo;

import javax.transaction.Transactional;

@Service
@Transactional
public class OrganizationRepoService {
    @Autowired
    private OrganizationRepo organizationRepo;

    public OrganizationRepoService() {
    }
}
