package stu.recruitmentweb.jobportal.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import stu.recruitmentweb.jobportal.service.FileStorageService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
public class FileController {

    private final FileStorageService fileStorageService;



    @GetMapping("/view-file/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/image/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        Resource resource = fileStorageService.loadFileAsResource(filename);
        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"");
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    @GetMapping("/document/{filename:.+}")
    public ResponseEntity<byte[]> getDocument(@PathVariable String filename) throws IOException, TikaException {
        Resource resource = fileStorageService.loadFileAsResource(filename);

        Tika tika = new Tika();
        String mimeType = tika.detect(resource.getFile());

        byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf(mimeType));
        headers.setContentDisposition(ContentDisposition.builder("inline")
                .filename(resource.getFilename()).build());

        return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    }

}
