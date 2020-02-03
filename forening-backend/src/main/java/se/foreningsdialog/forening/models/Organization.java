package se.foreningsdialog.forening.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.foreningsdialog.forening.models.houses.AbstractHouse;
import se.foreningsdialog.forening.models.loanobjects.AbstractLoanObject;
import se.foreningsdialog.forening.models.administration.Administration;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Organization {
    @Id
    @GeneratedValue
    private long id;

    private String organizationName;

    private String organizationNumber;

    private String organizationIdentificationName;

    private boolean isActivated=false;

    @OneToMany
    List<AbstractHouse> houses;

    @OneToMany
    List<AbstractLoanObject> loanObjects;

    @OneToMany
    List<Administration> administrators;



}
