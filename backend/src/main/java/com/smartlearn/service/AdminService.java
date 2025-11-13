package com.smartlearn.service;

import com.smartlearn.dto.UserProgressDTO;
import com.smartlearn.model.User;
import com.smartlearn.repository.ProgressRepository;
import com.smartlearn.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProgressRepository progressRepository;

    public List<UserProgressDTO> getUserProgress() {
        List<User> users = userRepository.findAll();
        List<UserProgressDTO> userProgressList = new ArrayList<>();

        for (User user : users) {
            // Count how many lessons completed by each user
            int lessonsCompleted = progressRepository.countByUser(user);

            // Example reward logic
            int rewards = lessonsCompleted * 10;

            // Add to DTO list
            userProgressList.add(
                new UserProgressDTO(
                    user.getId(),
                    user.getFullname(),
                    user.getUsername(),
                    lessonsCompleted,
                    rewards
                )
            );
        }

        return userProgressList;
    }
}
