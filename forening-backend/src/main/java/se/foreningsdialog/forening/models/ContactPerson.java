package se.foreningsdialog.forening.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@Entity
public class ContactPerson {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String contactName;

    private String contactTelephone;

    private String contactEmail;


}
