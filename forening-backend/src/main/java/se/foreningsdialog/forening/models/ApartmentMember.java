package se.foreningsdialog.forening.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.foreningsdialog.forening.models.houses.House;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class ApartmentMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String surName;

    private String lastName;

    private String password;

    @OneToOne
    private House house;
}
