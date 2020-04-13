package se.foreningsdialog.forening.repository.loanObjects;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.loanobjects.GuestFlat;

public interface GuestFlatRepository extends JpaRepository<GuestFlat,Long> {
}
