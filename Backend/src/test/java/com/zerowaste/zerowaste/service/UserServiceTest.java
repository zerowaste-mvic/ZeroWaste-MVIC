package com.zerowaste.zerowaste.service;

import com.zerowaste.zerowaste.dto.UserResponse;
import com.zerowaste.zerowaste.model.Notification;
import com.zerowaste.zerowaste.model.User;
import com.zerowaste.zerowaste.repository.NotificationRepository;
import com.zerowaste.zerowaste.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private NotificationRepository notificationRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void turningNotificationsOffShouldDisableAllNotificationTypes() {
        User user = User.builder()
                .id(1L)
                .fullName("Jane Doe")
                .email("jane@example.com")
                .password("encoded")
                .notificationsEnabled(true)
                .expiryAlertsEnabled(true)
                .donationUpdatesEnabled(true)
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(notificationRepository.save(any(Notification.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UserResponse response = userService.updateNotifications(1L, false);

        assertThat(response.getNotificationsEnabled()).isFalse();
        assertThat(response.getExpiryAlertsEnabled()).isFalse();
        assertThat(response.getDonationUpdatesEnabled()).isFalse();
    }

    @Test
    void turningNotificationsOnShouldEnableAllNotificationTypes() {
        User user = User.builder()
                .id(2L)
                .fullName("John Doe")
                .email("john@example.com")
                .password("encoded")
                .notificationsEnabled(false)
                .expiryAlertsEnabled(false)
                .donationUpdatesEnabled(false)
                .build();

        when(userRepository.findById(2L)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(notificationRepository.save(any(Notification.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UserResponse response = userService.updateNotifications(2L, true);

        assertThat(response.getNotificationsEnabled()).isTrue();
        assertThat(response.getExpiryAlertsEnabled()).isTrue();
        assertThat(response.getDonationUpdatesEnabled()).isTrue();
    }
}
