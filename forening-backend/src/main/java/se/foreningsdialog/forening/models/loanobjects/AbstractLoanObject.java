package se.foreningsdialog.forening.models.loanobjects;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "LOAN_OBJECT")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "LOAN_TYPE",discriminatorType = DiscriminatorType.INTEGER)
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
public abstract class AbstractLoanObject {

    @Id
    @GeneratedValue
    private long id;

}
