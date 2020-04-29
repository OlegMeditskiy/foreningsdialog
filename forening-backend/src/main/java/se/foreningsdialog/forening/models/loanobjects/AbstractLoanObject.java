package se.foreningsdialog.forening.models.loanobjects;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.foreningsdialog.forening.models.Organization;

import javax.persistence.*;

@Entity(name = "LOAN_OBJECT")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
public abstract class AbstractLoanObject {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private boolean hasCalendarData;

    private boolean isActivated=false;

    @ManyToOne
    @JoinTable(name = "organization_loan_object",joinColumns = @JoinColumn(name = "association_id"),inverseJoinColumns = @JoinColumn(name = "loan_object_id"))
    @JsonBackReference
    private Organization organization;

    @Column(name = "LOAN_TYPE")
    private String loanType;

    public abstract void setLoanType();

    @Override
    public String toString() {
        return "AbstractLoanObject{" +
                "id=" + id +
                ", hasCalendarData=" + hasCalendarData +
                ", isActivated=" + isActivated +
                ", organization=" + organization +
                '}';
    }
}
