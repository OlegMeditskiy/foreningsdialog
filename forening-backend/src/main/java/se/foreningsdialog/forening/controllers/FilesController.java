package se.foreningsdialog.forening.controllers;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import se.foreningsdialog.forening.storage.StorageService;

@RestController
@RequestMapping("/files")
public class FilesController {

    private final StorageService storageService;

    public FilesController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping(value = "/pdf/{filename:.+}",produces = "application/pdf")
    @ResponseBody
    public ResponseEntity<Resource> loadPDF(@PathVariable String filename) {
        Resource file = storageService.loadAsResource(filename);
        String[]split = file.getFilename().split("\\.(?=[^\\.]+$)");

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "inline; filename=\"" + file.getFilename() + "\"").body(file);
    }
    @GetMapping(value = "/image/{filename:.+}",produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public ResponseEntity<Resource> loadJPG(@PathVariable String filename) {
        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "inline; filename=\"" + file.getFilename() + "\"").body(file);
    }


@GetMapping(value = "/{filename:.+}")
public ModelAndView loadFiles(@PathVariable String filename) {
    Resource file = storageService.loadAsResource(filename);
        String[]split = file.getFilename().split("\\.(?=[^\\.]+$)");
        if (split[1].equals("pdf")){
            return new ModelAndView("redirect:" + "http://localhost:8080/files/pdf/"+filename);
        }
        else if(split[1].equals("jpg")||split[1].equals("png")||split[1].equals("jpeg")) {
            return new ModelAndView("redirect:" + "http://localhost:8080/files/image/"+filename);
        }
        else {
            return new ModelAndView("redirect:" + "http://localhost:8080/files/image/"+filename);
        }

}
}
