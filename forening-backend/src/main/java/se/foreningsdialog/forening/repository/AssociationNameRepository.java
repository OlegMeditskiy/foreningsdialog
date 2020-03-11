package se.foreningsdialog.forening.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.Organization;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssociationNameRepository extends CrudRepository<AssociationName, Long> {
    List<AssociationName> findByOrganization(Organization organization);
    Optional<AssociationName> findById(Long id);
}
