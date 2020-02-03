package se.foreningsdialog.forening.models.administration;

import se.foreningsdialog.forening.models.administration.constants.AdminRoles;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

public class OrganizationAdmin extends AbstractAdministration {
    private boolean canEditDocuments;
    @Enumerated(EnumType.ORDINAL)
    private AdminRoles roles;
}
