package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.houses.Guest;

public interface GuestRepository extends JpaRepository<Guest, Long> {


}
