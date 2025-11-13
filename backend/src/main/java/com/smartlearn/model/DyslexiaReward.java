package com.smartlearn.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "dyslexia_rewards")
public class DyslexiaReward {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id")
    private Long userId;

    private int lessonsCompleted;
    private int rewardPoints;
}
