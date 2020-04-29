package se.foreningsdialog.forening.models.houses;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.foreningsdialog.forening.models.users.audit.UserDateAudit;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Apartment extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

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
