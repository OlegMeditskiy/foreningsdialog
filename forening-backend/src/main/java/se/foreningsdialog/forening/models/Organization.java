package se.foreningsdialog.forening.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import se.foreningsdialog.forening.models.houses.House;
import se.foreningsdialog.forening.models.loanobjects.AbstractLoanObject;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Organization {
    @Id
    @GeneratedValue
    private long id;

    @NotBlank
    @Size(max = 40)
    private String organizationName;

    private String organizationNumber;
    private int numberOfApartments;
    private int totalArea;

    private boolean isActivated=false;

    @OneToMany
    List<House> houses;

    @OneToMany
    List<Association> associations;

    @OneToMany
    List<AbstractLoanObject> loanObjects;



}
