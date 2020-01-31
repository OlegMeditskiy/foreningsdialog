package se.foreningsdialog.forening.models.loanobjects;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue(value = "4")
@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@NoArgsConstructor
public class PartyPlace extends AbstractLoanObject {
}
