package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.News;

public interface NewsRepository extends JpaRepository<News, Long> {
}
