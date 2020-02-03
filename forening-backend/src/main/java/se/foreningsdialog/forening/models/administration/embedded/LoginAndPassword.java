package se.foreningsdialog.forening.models.administration.embedded;

import lombok.*;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class LoginAndPassword {
    private String username;
    private String password;
}
