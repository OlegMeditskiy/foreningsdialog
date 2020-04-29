package se.foreningsdialog.forening.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Getter
@Setter
@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Date startDate;
    private Date finishDate;
    private String title;
    private String description;

    @ManyToOne
    @JoinTable(name = "associations_news",joinColumns = @JoinColumn(name = "event_id"),inverseJoinColumns = @JoinColumn(name = "association_id"))
    @JsonBackReference
    private AssociationName associationName;
}
