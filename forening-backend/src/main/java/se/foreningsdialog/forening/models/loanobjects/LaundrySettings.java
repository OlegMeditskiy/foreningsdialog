package se.foreningsdialog.forening.models.loanobjects;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import java.util.Date;

@Entity
@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@NoArgsConstructor
public class LaundrySettings extends AbstractLoanObject {
    private Date startTime;
    private Date finishTime;
    private int lengthOfLaundry;

    @Override
    public void setLoanType() {
        setLoanType("Laundry");
    }
}
