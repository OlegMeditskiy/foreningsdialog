package se.foreningsdialog.forening.repository;

import org.springframework.data.repository.CrudRepository;
import se.foreningsdialog.forening.models.houses.House;

import java.util.Optional;

public interface HouseRepository extends CrudRepository<House,Long> {
    Optional<House> findById(Long id);
}
