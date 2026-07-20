package com.zerowaste.zerowaste.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

class ProfileImageStorageServiceTest {

    @Test
    void storesUploadedImageFileAndReturnsPublicUrl() throws Exception {
        Path tempDir = Files.createTempDirectory("profile-images-test");
        ProfileImageStorageService service = new ProfileImageStorageService(tempDir.toString());

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "My Photo.png",
                "image/png",
                "sample-image-data".getBytes(StandardCharsets.UTF_8));

        String storedUrl = service.storeProfileImage(file);

        assertThat(storedUrl).startsWith("/uploads/profile-images/");
        assertThat(Files.exists(tempDir.resolve(storedUrl.substring(storedUrl.lastIndexOf('/') + 1)))).isTrue();
    }
}
