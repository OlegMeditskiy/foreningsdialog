package se.foreningsdialog.forening.payload;

import lombok.Getter;
import lombok.Setter;
import se.foreningsdialog.forening.models.AssociationName;

import javax.persistence.Lob;

@Getter
@Setter
public class NewsRequest {
    private String newsTitle;

    @Lob
    private String newsText;

    private AssociationName associationName;
}
