package se.foreningsdialog.forening.models.loanobjects;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
public class GuestFlatSettings extends AbstractLoanObject {
    private int number;
    @Override
    public void setLoanType() {
        setLoanType("GuestFlat");
    }
}
