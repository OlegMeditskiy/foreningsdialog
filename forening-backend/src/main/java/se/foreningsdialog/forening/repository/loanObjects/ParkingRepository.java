package se.foreningsdialog.forening.repository.loanObjects;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.loanobjects.ParkingSettings;

public interface ParkingRepository extends JpaRepository<ParkingSettings,Long> {
    ParkingSettings findByOrganizationId(Long id);
}
