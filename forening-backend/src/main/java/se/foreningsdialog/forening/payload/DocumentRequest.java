package se.foreningsdialog.forening.payload;

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
