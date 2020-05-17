package se.foreningsdialog.forening.models.loanobjects;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.foreningsdialog.forening.models.Organization;

import javax.persistence.Entity;

@Entity
@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@NoArgsConstructor
public class ParkingSettings extends AbstractLoanObject {
    private String parkingNumber;

    public void vvvvv() {
        Organization organization;
    }

    @Override
    public void setLoanType() {
        setLoanType("Parking");
    }
}
