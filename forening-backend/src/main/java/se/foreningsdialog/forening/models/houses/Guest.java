package se.foreningsdialog.forening.models.houses;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.GuestRegister;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Guest{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private String email;

    @OneToOne(mappedBy = "guest",cascade = CascadeType.ALL)
    GuestRegister guestRegister;

    @ManyToOne
    @JoinTable(name = "apartment_guests",joinColumns = @JoinColumn(name = "guest_id"),inverseJoinColumns = @JoinColumn(name = "apartment_id"))
    @JsonBackReference
    private Apartment apartment;
}
