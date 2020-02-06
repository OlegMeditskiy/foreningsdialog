package se.foreningsdialog.forening.models.users;

import lombok.Data;
import se.foreningsdialog.forening.models.users.constants.UserRoles;
import se.foreningsdialog.forening.models.users.embedded.Information;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Embedded
    private Information information;

    @ElementCollection(targetClass = UserRoles.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name="user_id"))
    @Enumerated(EnumType.STRING)
    private List<UserRoles> rolesList;

    private String username;
    private String password;

    private boolean isActivated;
}
