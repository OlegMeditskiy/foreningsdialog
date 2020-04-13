package se.foreningsdialog.forening.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.Organization;
import se.foreningsdialog.forening.models.users.User;
import se.foreningsdialog.forening.models.users.audit.UserDateAudit;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
public class Association extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany
    private List<Organization> organizations;

}
