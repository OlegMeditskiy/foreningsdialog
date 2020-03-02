package se.foreningsdialog.forening.payload;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.loanobjects.AbstractLoanObject;

import javax.persistence.OneToMany;
import java.util.List;

@Getter
@Setter
public class OrganizationResponse {
    private Long id;

    private String orgNumber;
    private int numberOfApartments;
    private int totalArea;

    private boolean isActivated;

    @OneToMany
    List<AssociationName> associations;

    @OneToMany
    List<AbstractLoanObject> loanObjects;
}
