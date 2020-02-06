package se.foreningsdialog.forening.models.loanobjects;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@DiscriminatorValue(value = "LAUNDRY")
@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@NoArgsConstructor
public class Laundry extends AbstractLoanObject {
}
