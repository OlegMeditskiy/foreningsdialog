package se.foreningsdialog.forening.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String organizationName;

    private String organizationNumber;

    private String organizationIdentificationName;

    @OneToMany
    Set<House> houses;

}
