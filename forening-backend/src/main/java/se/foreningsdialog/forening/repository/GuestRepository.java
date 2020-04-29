package se.foreningsdialog.forening.repository;

import org.springframework.data.repository.CrudRepository;
import se.foreningsdialog.forening.models.houses.Guest;

import java.util.Optional;

public interface GuestRepository extends CrudRepository<Guest, Long> {
 Optional<Guest> findById(Long id);

}
