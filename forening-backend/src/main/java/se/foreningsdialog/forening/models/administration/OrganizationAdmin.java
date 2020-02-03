package se.foreningsdialog.forening.models.administration;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.foreningsdialog.forening.models.administration.constants.AdminRoles;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("ORGANIZATION_ADMIN")
public class OrganizationAdmin extends AbstractAdministration {
    private boolean canEditDocuments;
    @Enumerated(EnumType.ORDINAL)
    private AdminRoles roles;
}
