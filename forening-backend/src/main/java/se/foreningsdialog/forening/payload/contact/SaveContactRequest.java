package se.foreningsdialog.forening.payload.contact;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveContactRequest {
    Long contactId;
    private String contactName;

    private String contactTelephone;

    private String contactEmail;

}
