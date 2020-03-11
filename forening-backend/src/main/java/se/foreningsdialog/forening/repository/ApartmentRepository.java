package se.foreningsdialog.forening.repository;

import org.springframework.data.repository.CrudRepository;
import se.foreningsdialog.forening.models.houses.Apartment;

import java.util.Optional;

public interface ApartmentRepository extends CrudRepository<Apartment, Long> {
 Optional<Apartment> findById(Long id);
}
