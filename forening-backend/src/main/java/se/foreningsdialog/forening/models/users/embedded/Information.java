package se.foreningsdialog.forening.models.users.embedded;

import lombok.*;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Information {
    private String title;
    private String name;
    private String email;
    private String telephoneNumber;
}
