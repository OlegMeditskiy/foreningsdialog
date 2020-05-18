package se.foreningsdialog.forening.payload.association;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Lob;

@Getter
@Setter
public class NewsRequest {
    private String newsTitle;

    @Lob
    private String newsText;

    private Long associationNameId;
}
