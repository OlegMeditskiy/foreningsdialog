package se.foreningsdialog.forening.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.News;
import se.foreningsdialog.forening.payload.association.DeleteNewsRequest;
import se.foreningsdialog.forening.payload.association.NewsRequest;
import se.foreningsdialog.forening.payload.association.SaveNewsRequest;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.repository.AssociationNameRepository;
import se.foreningsdialog.forening.repository.NewsRepository;


@Service
public class NewsService {
    private final AssociationNameRepository associationNameRepository;

    private final NewsRepository newsRepository;

    public NewsService(AssociationNameRepository associationNameRepository, NewsRepository newsRepository) {
        this.associationNameRepository = associationNameRepository;
        this.newsRepository = newsRepository;
    }

    public ResponseEntity<?> createNews(NewsRequest newsRequest) {
        News news = new News();
        AssociationName associationName = associationNameRepository.getOne(newsRequest.getAssociationNameId());
        news.setAssociationName(associationName);
        news.setNewsText(newsRequest.getNewsText());
        news.setNewsTitle(newsRequest.getNewsTitle());
        newsRepository.save(news);
        return ResponseEntity.ok().body(new ApiResponse(true, "Nyhet var skapad."));
    }
    public ResponseEntity<?> deleteNews(DeleteNewsRequest deleteNewsRequest) {
        News news = newsRepository.getOne(deleteNewsRequest.getId());
        news.setAssociationName(null);
        newsRepository.delete(news);
        return ResponseEntity.ok().body(new ApiResponse(true, "News was deleted"));
    }
    public ResponseEntity<?> saveNews(SaveNewsRequest saveNewsRequest) {
        News news = newsRepository.getOne(saveNewsRequest.getNewsId());
        news.setNewsText(saveNewsRequest.getNewsText());
        news.setNewsTitle(saveNewsRequest.getNewsTitle());
        newsRepository.save(news);
        return ResponseEntity.ok().body(new ApiResponse(true, "News was deleted"));
    }
}
