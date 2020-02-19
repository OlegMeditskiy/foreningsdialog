package se.foreningsdialog.forening.models;

import lombok.Data;
import se.foreningsdialog.forening.models.Organization;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Association {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany
    List<Organization> organizations;

}
