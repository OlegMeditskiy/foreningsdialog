package se.foreningsdialog.forening.repository.loanObjects;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.loanobjects.LaundrySettings;

public interface LaundryRepository extends JpaRepository<LaundrySettings, Long> {
    LaundrySettings findByOrganizationId(Long id);
}
