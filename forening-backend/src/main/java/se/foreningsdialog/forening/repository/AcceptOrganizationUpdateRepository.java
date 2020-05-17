package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.AcceptOrganizationUpdate;

public interface AcceptOrganizationUpdateRepository extends JpaRepository<AcceptOrganizationUpdate,Long> {
}
