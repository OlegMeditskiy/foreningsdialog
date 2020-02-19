package se.foreningsdialog.forening.models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Association {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @OneToMany
    List<ContactPerson> contacts;
}
