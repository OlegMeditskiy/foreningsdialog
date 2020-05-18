package se.foreningsdialog.forening.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.models.loanobjects.*;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.payload.loanSettings.LoanSettingsRequest;
import se.foreningsdialog.forening.repository.loanObjects.*;

@Service
public class LoanSettingsService {
    private final
    ExternLokalRepository externLokalRepository;

    private final
    GuestFlatRepository guestFlatRepository;

    private final
    LaundryRepository laundryRepository;

    private final
    ParkingRepository parkingRepository;

    private final
    PartyPlaceRepository partyPlaceRepository;

    private final
    PoolRepository poolRepository;

    public LoanSettingsService(ExternLokalRepository externLokalRepository, GuestFlatRepository guestFlatRepository, LaundryRepository laundryRepository, ParkingRepository parkingRepository, PartyPlaceRepository partyPlaceRepository, PoolRepository poolRepository) {
        this.externLokalRepository = externLokalRepository;
        this.guestFlatRepository = guestFlatRepository;
        this.laundryRepository = laundryRepository;
        this.parkingRepository = parkingRepository;
        this.partyPlaceRepository = partyPlaceRepository;
        this.poolRepository = poolRepository;
    }

    public ResponseEntity<?> saveSettings(LoanSettingsRequest saveSettingsRequest) {
        Long orgId = saveSettingsRequest.getOrganisationId();

        ExternLokalSettings externLokalSettings = externLokalRepository.findByOrganizationId(orgId);

        externLokalSettings.setActivated(saveSettingsRequest.isExternLokal());

        GuestFlatSettings guestFlatSettings = guestFlatRepository.findByOrganizationId(orgId);
        guestFlatSettings.setActivated(saveSettingsRequest.isGuestFlat());

        LaundrySettings laundrySettings = laundryRepository.findByOrganizationId(orgId);
        laundrySettings.setActivated(saveSettingsRequest.isLaundry());

        ParkingSettings parkingSettings = parkingRepository.findByOrganizationId(orgId);
        parkingSettings.setActivated(saveSettingsRequest.isParking());

        PartyPlaceSettings partyPlaceSettings = partyPlaceRepository.findByOrganizationId(orgId);
        partyPlaceSettings.setActivated(saveSettingsRequest.isPartyPlace());

        PoolSettings poolSettings = poolRepository.findByOrganizationId(orgId);
        poolSettings.setActivated(saveSettingsRequest.isPool());

        externLokalRepository.save(externLokalSettings);
        guestFlatRepository.save(guestFlatSettings);
        laundryRepository.save(laundrySettings);
        parkingRepository.save(parkingSettings);
        partyPlaceRepository.save(partyPlaceSettings);
        poolRepository.save(poolSettings);

        return ResponseEntity.ok().body(new ApiResponse(true, "Settings was saved"));
    }
}
