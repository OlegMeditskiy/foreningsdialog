package se.foreningsdialog.forening.models.houses;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.foreningsdialog.forening.models.ApartmentMember;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Entity
@DiscriminatorValue("APARTMENT")
public class Apartment{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToMany
    private List<ApartmentMember> members;

    private int number;
}
