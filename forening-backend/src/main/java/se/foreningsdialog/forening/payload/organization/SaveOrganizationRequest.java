package se.foreningsdialog.forening.payload.organization;

import lombok.Getter;

@Getter
public class SaveOrganizationRequest {
    private Long id;
    private String orgNumber;
    private int numberOfApartments;
    private int totalArea;
}
