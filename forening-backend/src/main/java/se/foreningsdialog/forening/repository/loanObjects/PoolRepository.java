package se.foreningsdialog.forening.repository.loanObjects;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.loanobjects.Pool;

public interface PoolRepository extends JpaRepository<Pool,Long> {
}
