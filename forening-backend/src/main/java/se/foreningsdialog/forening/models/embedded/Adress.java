package se.foreningsdialog.forening.models.embedded;

import lombok.*;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Adress {
    private String street;
    private String city;
    private String zipCode;
}
