package se.foreningsdialog.forening.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.users.audit.UserDateAudit;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class News extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String newsTitle;

    private String newsText;


    @ManyToOne
    @JoinTable(name = "associations_news", joinColumns = @JoinColumn(name = "news_id"), inverseJoinColumns = @JoinColumn(name = "association_id"))
    @JsonBackReference
    private AssociationName associationName;

}
