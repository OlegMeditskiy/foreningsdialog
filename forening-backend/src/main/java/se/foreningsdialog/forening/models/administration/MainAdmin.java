package se.foreningsdialog.forening.models.administration;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.foreningsdialog.forening.models.administration.constants.SuperAdminRoles;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("MAIN_ADMIN")
public class MainAdmin extends AbstractAdministration {
    private SuperAdminRoles role = SuperAdminRoles.APPLICATION_ADMIN;
}
