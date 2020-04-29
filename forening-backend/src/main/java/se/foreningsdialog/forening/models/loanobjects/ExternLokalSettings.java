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
public class ExternLokalSettings extends AbstractLoanObject {
    private String address;


    @Override
    public void setLoanType() {
        setLoanType("ExternLokal");
    }

    @Override
    public String toString() {
        return "ExternLokalSettings{" +
                "address='" + address + '\'' +
                '}';
    }
}
