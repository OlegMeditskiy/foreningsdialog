package se.foreningsdialog.forening.models.houses;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.foreningsdialog.forening.models.users.Guest;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Entity
public class Apartment{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne
    private House house;

    @OneToMany
    private List<Guest> guests;

    private int number;

    private int area;

    private int roomAndKitchen;


}
