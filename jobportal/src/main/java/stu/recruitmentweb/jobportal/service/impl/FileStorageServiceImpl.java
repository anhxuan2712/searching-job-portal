package stu.recruitmentweb.jobportal.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import stu.recruitmentweb.jobportal.config.FileStorageProperties;
import stu.recruitmentweb.jobportal.exception.FileStorageException;
import stu.recruitmentweb.jobportal.exception.MyFileNotFoundException;
import stu.recruitmentweb.jobportal.service.FileStorageService;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class FileStorageServiceImpl implements FileStorageService {
    private Path fileStorageLocation;

    public FileStorageServiceImpl() {
        // TODO document why this constructor is empty
    }

    @Autowired
    public void FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Invalid");
        }
    }

    @Override
    public String storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains(".."))
                throw new FileStorageException("Invalid!!");

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return "photographer/files/" + fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Invalid!!!");
        }
    }

    @Override
    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("Not found!!!");
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("Not found!!!");
        }
    }
}
