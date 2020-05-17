package se.foreningsdialog.forening.payload.organization;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.Association;

@Getter
@Setter
public class NewOrganisationsRequest {
    private Association association;
    private Long userId;

}
