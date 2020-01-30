package se.foreningsdialog.forening.models.loanobjects;

import lombok.*;
import se.foreningsdialog.forening.models.loanobjects.constants.TimeLoanType;

import javax.persistence.*;

@Entity(name = "LOAN_OBJECT")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "LOAN_TYPE",discriminatorType = DiscriminatorType.INTEGER)
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
/*
    @Inheritance
    strategin används mest för optimisering till web-applikationen
    polymorphism queries går väldigt snabbt med denna strategi
    MEN
    databasens schema kommer inte se vackert ut & NULL värden måste ligga i databasen
    är databasens schema viktigt för alla låne objekt? Eller är java koden viktigare?
    @DiscriminatorColumn
    Column namnet som databasen kommer använda för att klura ut vilket typ av låne objekt tillhör
    @NoArgsConstructor
    är en lombok annotation som generar en tom konstruktor behövs för JPA
*/
public abstract class AbstractLoanObject {

    @Id
    @GeneratedValue
    /*
     * Om man ska göra en microservice eller distributed system av denna applikation
     * tänk över om java.util.UUID kan användas som ID istället.
     */
    private long id;
    @Enumerated(EnumType.STRING)
    private TimeLoanType timeLoanType;
}
