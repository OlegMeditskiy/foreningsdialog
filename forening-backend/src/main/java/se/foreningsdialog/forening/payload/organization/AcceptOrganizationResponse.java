package se.foreningsdialog.forening.payload.organization;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AcceptOrganizationResponse {
    private Long organizationId;
    private Long acceptId;
    private String oldOrganizationNumber;
    private int oldNumberOfApartments;
    private int oldTotalArea;

    private String newOrganizationNumber;
    private int newNumberOfApartments;
    private int newTotalArea;
}
