package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.foreningsdialog.forening.models.AssociationName;

@Repository
public interface AssociationNameRepository extends JpaRepository<AssociationName, Long> {
}
