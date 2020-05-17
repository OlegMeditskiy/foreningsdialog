package se.foreningsdialog.forening.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class AcceptOrganizationUpdate {
    @Id
    @GeneratedValue
    private long id;

    private Long organizationId;

    private String oldOrganizationNumber;
    private int oldNumberOfApartments;
    private int oldTotalArea;

    private String newOrganizationNumber;
    private Integer newNumberOfApartments;
    private Integer newTotalArea;

    public AcceptOrganizationUpdate() {
    }

}
