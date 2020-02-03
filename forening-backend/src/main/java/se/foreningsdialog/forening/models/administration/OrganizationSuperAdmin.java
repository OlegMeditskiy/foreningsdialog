package se.foreningsdialog.forening.models.administration;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.administration.constants.SuperAdminRoles;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("ORGANIZATION_SUPER_ADMIN")
public class OrganizationSuperAdmin extends AbstractAdministration {

    private SuperAdminRoles role = SuperAdminRoles.ORGANIZATION_SUPER_ADMIN;

    @ManyToOne
    private Organization organization;

}
