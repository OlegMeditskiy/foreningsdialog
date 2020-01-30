package se.foreningsdialog.forening.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.foreningsdialog.forening.models.loanobjects.AbstractLoanObject;

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

    @OneToMany
    List<House> houses;

    @OneToMany
    List<AbstractLoanObject> loanObjects;

}
