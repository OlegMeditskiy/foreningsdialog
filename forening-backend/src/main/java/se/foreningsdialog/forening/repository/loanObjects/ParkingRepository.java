package se.foreningsdialog.forening.repository.loanObjects;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.loanobjects.Parking;

public interface ParkingRepository extends JpaRepository<Parking,Long> {
}
