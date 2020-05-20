package se.foreningsdialog.forening.models.houses;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.GuestRegister;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Guest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private String email;

    @OneToOne(mappedBy = "guest")
    @JsonManagedReference
    private GuestRegister guestRegister;

    @ManyToOne
    @JoinTable(name = "apartment_guests", joinColumns = @JoinColumn(name = "guest_id"), inverseJoinColumns = @JoinColumn(name = "apartment_id"))
    @JsonBackReference
    private Apartment apartment;

    @Override
    public String toString() {
        return "Guest{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", guestRegister=" + guestRegister +
                ", apartment=" + apartment +
                '}';
    }
}
