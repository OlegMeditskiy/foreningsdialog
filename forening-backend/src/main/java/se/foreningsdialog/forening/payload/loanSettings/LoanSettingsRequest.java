package se.foreningsdialog.forening.payload.loanSettings;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoanSettingsRequest {
    private boolean externLokal;
    private boolean guestFlat;
    private boolean laundry;
    private boolean parking;
    private boolean partyPlace;
    private boolean pool;
    private Long organisationId;

    @Override
    public String toString() {
        return "LoanSettingsRequest{" +
                "externLokal=" + externLokal +
                ", guestFlat=" + guestFlat +
                ", laundry=" + laundry +
                ", parking=" + parking +
                ", partyPlace=" + partyPlace +
                ", pool=" + pool +
                ", organisationId=" + organisationId +
                '}';
    }
}
