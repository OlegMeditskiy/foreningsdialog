package se.foreningsdialog.forening.models;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
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
    private List<AssociationName> associations;

    @OneToMany(mappedBy = "organization",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<AbstractLoanObject> loanObjects;


    @Override
    public String toString() {
        return "Organization{" +
                "id=" + id +
                ", orgNumber='" + orgNumber + '\'' +
                ", numberOfApartments=" + numberOfApartments +
                ", totalArea=" + totalArea +
                ", isActivated=" + isActivated +
                ", associations=" + associations +
                ", loanObjects=" + loanObjects +
                '}';
    }
}
