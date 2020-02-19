package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.foreningsdialog.forening.models.ContactPerson;

@Repository
public interface ContactPersonRepository extends JpaRepository<ContactPerson, Long> {
}
