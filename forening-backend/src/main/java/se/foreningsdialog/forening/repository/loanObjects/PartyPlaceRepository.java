package se.foreningsdialog.forening.repository.loanObjects;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.loanobjects.PartyPlaceSettings;

public interface PartyPlaceRepository extends JpaRepository<PartyPlaceSettings,Long> {
    PartyPlaceSettings findByOrganizationId(Long id);
}
