package se.foreningsdialog.forening.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.foreningsdialog.forening.models.ContactPerson;

import java.util.Optional;

@Repository
public interface ContactPersonRepository extends CrudRepository<ContactPerson, Long> {
 Optional<ContactPerson> findById(Long id);
}
