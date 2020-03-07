package se.foreningsdialog.forening.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.models.loanobjects.AbstractLoanObject;
import se.foreningsdialog.forening.models.users.audit.UserDateAudit;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Organization extends UserDateAudit {
    @Id
    @GeneratedValue
    private long id;

    private String orgNumber;
    private int numberOfApartments;
    private int totalArea;

    private boolean isActivated=false;

    @OneToMany
    List<AssociationName> associations;

    @OneToMany
    List<AbstractLoanObject> loanObjects;



}
