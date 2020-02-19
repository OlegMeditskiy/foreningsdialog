package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.foreningsdialog.forening.models.Organization;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
}
