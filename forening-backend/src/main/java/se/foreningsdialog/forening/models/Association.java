package se.foreningsdialog.forening.models;

import lombok.Data;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.models.users.audit.UserDateAudit;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Association extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany
    List<Organization> organizations;

}
