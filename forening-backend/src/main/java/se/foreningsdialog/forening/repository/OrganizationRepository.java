package se.foreningsdialog.forening.repository;

import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.foreningsdialog.forening.models.Association;
import se.foreningsdialog.forening.models.Organization;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    Page<Organization> findByCreatedBy(Long userId, Pageable pageable);
}
