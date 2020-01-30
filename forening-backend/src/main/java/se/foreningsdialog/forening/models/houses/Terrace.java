package se.foreningsdialog.forening.models.houses;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Entity
// Radhus? Värt att ha vet ej
public class Terrace extends AbstractHouse {
}
