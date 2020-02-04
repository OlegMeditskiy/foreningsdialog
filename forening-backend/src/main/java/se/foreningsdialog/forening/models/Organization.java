package se.foreningsdialog.forening.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import se.foreningsdialog.forening.models.houses.AbstractHouse;
import se.foreningsdialog.forening.models.loanobjects.AbstractLoanObject;
import se.foreningsdialog.forening.models.administration.AbstractAdministration;

import javax.persistence.*;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Organization {
    @Id
    @GeneratedValue
    private long id;
    private String organizationName;
    private String organizationNumber;

    //    private boolean isActivated=false;

    @OneToMany
    List<AbstractHouse> houses;

    @OneToMany
    List<AbstractLoanObject> loanObjects;

    @OneToMany
    List<AbstractAdministration> administrators;


}
