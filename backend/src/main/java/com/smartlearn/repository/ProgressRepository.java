package com.smartlearn.repository;

import com.smartlearn.model.Progress;
import com.smartlearn.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {
    int countByUser(User user);
}
