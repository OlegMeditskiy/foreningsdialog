package se.foreningsdialog.forening.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Flat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int flatNumber;

}
