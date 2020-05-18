package se.foreningsdialog.forening.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.foreningsdialog.forening.models.Organization;

import java.util.List;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {


    Page<Organization> findByCreatedBy(Long userId, Pageable pageable);

    List<Organization> findByCreatedBy(Long userId);

}
