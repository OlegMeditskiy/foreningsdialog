package se.foreningsdialog.forening.models.loanobjects;

import lombok.*;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue(value = "1")
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
/*
 * @DiscriminatorValue(value = "Key")
 * Databasen "hålla reda på" värde för detta objekt,
 * 'Key' används av databasen för att hitta objektets data
 */
public class GuestFlat extends AbstractLoanObject{
}
