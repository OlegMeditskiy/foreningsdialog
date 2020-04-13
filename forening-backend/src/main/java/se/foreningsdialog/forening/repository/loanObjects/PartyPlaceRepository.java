package se.foreningsdialog.forening.repository.loanObjects;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.loanobjects.PartyPlace;

public interface PartyPlaceRepository extends JpaRepository<PartyPlace,Long> {
}
