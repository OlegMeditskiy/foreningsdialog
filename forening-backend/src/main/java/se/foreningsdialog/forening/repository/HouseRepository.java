package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.houses.House;

public interface HouseRepository extends JpaRepository<House,Long> {
}
