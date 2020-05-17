package se.foreningsdialog.forening.payload.organization;

import lombok.Getter;

@Getter
public class AcceptOrganizationRequest {
    private Long organizationId;

    private String oldOrganizationNumber;
    private int oldNumberOfApartments;
    private int oldTotalArea;

    private String newOrganizationNumber;
    private int newNumberOfApartments;
    private int newTotalArea;

    private Long acceptId;

    @Override
    public String toString() {
        return "AcceptOrganizationRequest{" +
                "organizationId=" + organizationId +
                ", oldOrganizationNumber='" + oldOrganizationNumber + '\'' +
                ", oldNumberOfApartments=" + oldNumberOfApartments +
                ", oldTotalArea=" + oldTotalArea +
                ", newOrganizationNumber='" + newOrganizationNumber + '\'' +
                ", newNumberOfApartments=" + newNumberOfApartments +
                ", newTotalArea=" + newTotalArea +
                ", acceptId=" + acceptId +
                '}';
    }
}
