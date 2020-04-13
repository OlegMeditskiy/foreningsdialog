package se.foreningsdialog.forening.repository.loanObjects;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.loanobjects.Laundry;

public interface LaundryRepository extends JpaRepository<Laundry,Long> {
}
