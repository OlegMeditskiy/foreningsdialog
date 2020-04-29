package se.foreningsdialog.forening.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@Entity
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String newsTitle;

    @Lob
    private String newsText;

    @CreatedDate
    private Instant createdAt;

    @ManyToOne
    @JoinTable(name = "associations_news",joinColumns = @JoinColumn(name = "news_id"),inverseJoinColumns = @JoinColumn(name = "association_id"))
    @JsonBackReference
    private AssociationName associationName;

}
