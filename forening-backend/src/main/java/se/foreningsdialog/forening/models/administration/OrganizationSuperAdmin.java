package se.foreningsdialog.forening.models.administration;

import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.administration.constants.SuperAdminRoles;

import javax.persistence.ManyToOne;

public class OrganizationSuperAdmin extends AbstractAdministration {

    private SuperAdminRoles role = SuperAdminRoles.ORGANIZATION_SUPER_ADMIN;

    @ManyToOne
    private Organization organization;

}
