package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
