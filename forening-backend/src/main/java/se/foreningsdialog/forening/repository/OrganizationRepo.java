package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.Organization;

public interface OrganizationRepo extends JpaRepository<Organization, Long> {

}
