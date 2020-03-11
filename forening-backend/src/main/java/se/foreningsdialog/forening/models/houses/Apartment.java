package se.foreningsdialog.forening.models.houses;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

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

    @ManyToOne
    @JoinTable(name = "house_apartments",joinColumns = @JoinColumn(name = "apartment_id"),inverseJoinColumns = @JoinColumn(name = "house_id"))
    @JsonBackReference
    private House house;

    public Apartment(int number, int roomAndKitchen, int area, House house) {
        this.number=number;
        this.roomAndKitchen=roomAndKitchen;
        this.area=area;
        this.house=house;
    }

    @OneToMany(mappedBy = "apartment",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Guest> guests;


    private int number;

    private int area;

    private int roomAndKitchen;


}
