package se.foreningsdialog.forening.payload.association;

import lombok.Getter;

@Getter
public class SaveNewsRequest {
    private Long newsId;
    private String newsText;
    private String newsTitle;
}
