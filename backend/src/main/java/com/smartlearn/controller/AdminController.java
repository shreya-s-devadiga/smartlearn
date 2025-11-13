package com.smartlearn.controller;

import com.smartlearn.model.User;
import com.smartlearn.repository.UserRepository;
import com.smartlearn.repository.DyslexiaRewardRepository;
import com.smartlearn.repository.DyslexiaRewardRepository.UserProgressRow;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final UserRepository userRepo;
    private final DyslexiaRewardRepository rewardRepo;

    public AdminController(UserRepository userRepo, DyslexiaRewardRepository rewardRepo) {
        this.userRepo = userRepo;
        this.rewardRepo = rewardRepo;
    }

    // ✅ Dashboard Summary Stats
    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStats() {
        Long totalUsers = userRepo.count();
        Long totalLessons = rewardRepo.getTotalLessonsCompleted();
        Integer totalRewardPoints = rewardRepo.getTotalAllRewards();

        return new HashMap<String, Object>() {{
            put("totalUsers", totalUsers);
            put("totalLessonsCompleted", totalLessons);
            put("totalRewardPoints", totalRewardPoints != null ? totalRewardPoints : 0);
        }};
    }

    // ✅ Get All Users (for Manage Users Page)
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    // ✅ Delete Non-Admin User
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        User user = userRepo.findById(id).orElse(null);

        if (user == null)
            return ResponseEntity.badRequest().body("User Not Found");

        if ("ADMIN".equalsIgnoreCase(user.getRole()))
            return ResponseEntity.badRequest().body("Cannot delete Admin");

        userRepo.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    // ✅ Update User Info (Edit Feature)
    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepo.findById(id)
                .map(user -> {
                    user.setFullname(updatedUser.getFullname());
                    user.setEmail(updatedUser.getEmail());
                    user.setRole(updatedUser.getRole());
                    userRepo.save(user);
                    return ResponseEntity.ok("User updated successfully");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ FIXED: User Progress Endpoint (Matches Frontend)
    // ✅ User Learning Progress (Lessons + Rewards)
@GetMapping("/user-progress")
public List<Map<String, Object>> getUserProgress() {
    List<UserProgressRow> rows = rewardRepo.getUserProgress();
    List<Map<String, Object>> result = new ArrayList<>();

    for (UserProgressRow r : rows) {
        // 👇 Filter out admin users here
        if (r.getUsername() != null && !r.getUsername().equalsIgnoreCase("sanvi")) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", r.getId());
            map.put("username", r.getUsername());
            map.put("fullname", r.getFullname());
            map.put("lessons", r.getLessons());
            map.put("rewards", r.getRewards());
            result.add(map);
        }
    }

    return result;


    
}
}