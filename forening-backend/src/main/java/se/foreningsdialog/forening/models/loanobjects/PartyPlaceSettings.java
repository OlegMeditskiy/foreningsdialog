package se.foreningsdialog.forening.models.loanobjects;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@NoArgsConstructor
public class PartyPlaceSettings extends AbstractLoanObject {
    private String address;
    private int number;

    @Override
    public void setLoanType() {
        setLoanType("PartyPlace");
    }
}
