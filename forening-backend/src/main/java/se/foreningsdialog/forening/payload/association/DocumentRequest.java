package se.foreningsdialog.forening.payload.association;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DocumentRequest {

    private String title;

    private Long documentTypeId;

    @Override
    public String toString() {
        return "DocumentRequest{" +
                "title='" + title + '\'' +
                ", documentTypeId=" + documentTypeId +
                '}';
    }
}
