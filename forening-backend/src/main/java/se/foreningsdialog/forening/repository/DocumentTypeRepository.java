package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.DocumentType;

public interface DocumentTypeRepository extends JpaRepository<DocumentType,Long> {
}
