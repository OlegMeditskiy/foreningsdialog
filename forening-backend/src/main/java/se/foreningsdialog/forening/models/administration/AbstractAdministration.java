package se.foreningsdialog.forening.models.administration;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.foreningsdialog.forening.models.administration.embedded.Information;
import se.foreningsdialog.forening.models.administration.embedded.LoginAndPassword;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Entity(name = "Administration")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "ADMIN_TYPE")
public class AbstractAdministration {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Embedded
    private Information information;

    @Embedded
    private LoginAndPassword loginAndPassword;

}
