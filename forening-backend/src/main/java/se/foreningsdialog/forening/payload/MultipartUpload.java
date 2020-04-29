package se.foreningsdialog.forening.payload;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class MultipartUpload {
    private MultipartFile file;
}
