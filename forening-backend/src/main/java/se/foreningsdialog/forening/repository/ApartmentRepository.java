package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.houses.Apartment;

public interface ApartmentRepository extends JpaRepository<Apartment, Long> {

}
