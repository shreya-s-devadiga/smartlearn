package com.smartlearn.repository;

import com.smartlearn.model.DyslexiaReward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DyslexiaRewardRepository extends JpaRepository<DyslexiaReward, Long> {

    DyslexiaReward findByUserId(Long userId);

    @Query("SELECT COALESCE(SUM(r.rewardPoints), 0) FROM DyslexiaReward r")
    Integer getTotalAllRewards();

    @Query("SELECT COALESCE(SUM(r.lessonsCompleted), 0) FROM DyslexiaReward r")
    Long getTotalLessonsCompleted();

    // ✅ Projection interface for User Progress
    public interface UserProgressRow {
        Long getId();
        String getUsername();
        String getFullname();
        Long getLessons();
        Long getRewards();
    }

    // ✅ Combined Query: Lessons + Reward Points
    @Query("""
        SELECT 
            u.id AS id,
            u.username AS username,
            u.fullname AS fullname,
            COALESCE(SUM(r.lessonsCompleted), 0) AS lessons,
            COALESCE(SUM(r.rewardPoints), 0) AS rewards
        FROM User u
        LEFT JOIN DyslexiaReward r ON r.userId = u.id
        GROUP BY u.id, u.username, u.fullname
        ORDER BY lessons DESC
    """)
    List<UserProgressRow> getUserProgress();
}
