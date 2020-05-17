package se.foreningsdialog.forening.repository.loanObjects;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.loanobjects.PoolSettings;

public interface PoolRepository extends JpaRepository<PoolSettings, Long> {
    PoolSettings findByOrganizationId(Long id);
}
