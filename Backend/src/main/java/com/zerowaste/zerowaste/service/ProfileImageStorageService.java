package com.zerowaste.zerowaste.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProfileImageStorageService {

    private final Path storageDirectory;

    public ProfileImageStorageService(@Value("${app.upload.dir:uploads/profile-images}") String storagePath) {
        this.storageDirectory = Path.of(storagePath).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.storageDirectory);
        } catch (IOException e) {
            throw new IllegalStateException("Unable to initialize profile image storage", e);
        }
    }

    public String storeProfileImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Profile image file is required.");
        }

        String originalFileName = file.getOriginalFilename();
        String extension = ".png";
        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
        }

        String storedFileName = UUID.randomUUID() + extension;
        Path targetPath = storageDirectory.resolve(storedFileName);

        try {
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new IllegalStateException("Unable to store profile image", e);
        }

        return "/uploads/profile-images/" + storedFileName;
    }
}
