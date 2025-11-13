package com.smartlearn.controller;

import com.smartlearn.model.DyslexiaReward;
import com.smartlearn.repository.DyslexiaRewardRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rewards")
@CrossOrigin // allow frontend access
public class RewardController {

    private final DyslexiaRewardRepository rewardRepo;

    public RewardController(DyslexiaRewardRepository rewardRepo) {
        this.rewardRepo = rewardRepo;
    }

    // ✅ Add / Update Reward When Lesson is Completed
    @PostMapping("/add")
    public String addReward(@RequestParam Long userId, @RequestParam int points) {

        // find existing reward or create a new one
        DyslexiaReward reward = rewardRepo.findByUserId(userId);
        if (reward == null) {
            reward = new DyslexiaReward();
            reward.setUserId(userId);
            reward.setLessonsCompleted(0);
            reward.setRewardPoints(0);
        }

        // update reward
        reward.setLessonsCompleted(reward.getLessonsCompleted() + 1);
        reward.setRewardPoints(reward.getRewardPoints() + points);

        rewardRepo.save(reward);
        return "✅ Reward Updated Successfully";
    }

    // ✅ Get reward for one user (User Reward Page)
    @GetMapping("/user/{userId}")
    public DyslexiaReward getUserReward(@PathVariable Long userId) {
        DyslexiaReward reward = rewardRepo.findByUserId(userId);
        if (reward == null) {
            reward = new DyslexiaReward();
            reward.setUserId(userId);
            reward.setLessonsCompleted(0);
            reward.setRewardPoints(0);
        }
        return reward;
    }
}
