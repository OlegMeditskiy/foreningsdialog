package se.foreningsdialog.forening.models;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import se.foreningsdialog.forening.models.houses.Guest;

import javax.persistence.*;
import java.util.UUID;


@Getter
@Setter
@Entity
@Table(name = "guest_register")
public class GuestRegister {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String address;
    private int number;
    private int area;
    private int roomAndKitchen;

    @OneToOne
    @JoinTable(name = "guest_register_guest", joinColumns = @JoinColumn(name = "guest_register_id"), inverseJoinColumns = @JoinColumn(name = "guest_id"))
    Guest guest;

    @Type(type = "uuid-char")
    private UUID uniqueKey = UUID.randomUUID();

    public GuestRegister() {
    }

    public GuestRegister(String address, int number, int area, int roomAndKitchen) {
        this.address = address;
        this.number = number;
        this.area = area;
        this.roomAndKitchen = roomAndKitchen;
    }

    private boolean isActivated = false;

    @Override
    public String toString() {
        return "GuestRegister{" +
                "address='" + address + '\'' +
                ", number=" + number +
                ", area=" + area +
                ", roomAndKitchen=" + roomAndKitchen +
                ", uniqkey='" + uniqueKey + '\'' +
                '}';
    }
}
