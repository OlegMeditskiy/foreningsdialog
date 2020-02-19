package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.foreningsdialog.forening.models.Association;
@Repository
public interface AssociationRepository extends JpaRepository<Association, Long> {
}
