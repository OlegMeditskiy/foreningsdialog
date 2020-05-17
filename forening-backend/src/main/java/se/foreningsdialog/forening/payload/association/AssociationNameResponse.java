package se.foreningsdialog.forening.payload.association;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.ContactPerson;
import se.foreningsdialog.forening.models.DocumentType;
import se.foreningsdialog.forening.models.Event;
import se.foreningsdialog.forening.models.News;
import se.foreningsdialog.forening.models.houses.House;

import javax.persistence.OneToMany;
import java.util.List;

@Getter
@Setter
public class AssociationNameResponse {
    private Long id;
    private String associationName;

    @OneToMany
    private List<ContactPerson> contacts;

    @OneToMany
    private List<House> houses;

    @OneToMany
    private List<News> news;

    @OneToMany
    private List<DocumentType> documentTypes;

    @OneToMany
    private List<Event> events;

}
