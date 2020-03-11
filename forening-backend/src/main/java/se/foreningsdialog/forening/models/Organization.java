package se.foreningsdialog.forening.models;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.models.loanobjects.AbstractLoanObject;
import se.foreningsdialog.forening.models.users.audit.UserDateAudit;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@Entity
public class Organization extends UserDateAudit {
    @Id
    @GeneratedValue
    private long id;

    private String orgNumber;
    private int numberOfApartments;
    private int totalArea;

    private boolean isActivated=false;

    @OneToMany(mappedBy = "organization",cascade = CascadeType.ALL)
    @JsonManagedReference
    List<AssociationName> associations;

    @OneToMany
    List<AbstractLoanObject> loanObjects;



}
