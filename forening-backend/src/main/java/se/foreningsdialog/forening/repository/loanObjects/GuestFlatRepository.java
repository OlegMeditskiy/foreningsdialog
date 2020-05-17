package se.foreningsdialog.forening.repository.loanObjects;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.loanobjects.GuestFlatSettings;

public interface GuestFlatRepository extends JpaRepository<GuestFlatSettings, Long> {
    GuestFlatSettings findByOrganizationId(Long id);
}
