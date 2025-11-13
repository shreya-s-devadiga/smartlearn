// 📁 src/main/java/com/smartlearn/dto/UserProgressDTO.java
package com.smartlearn.dto;

public class UserProgressDTO {
    private Long id;
    private String fullname;
    private String username;
    private int lessons;
    private int rewards;

    public UserProgressDTO(Long id, String fullname, String username, int lessons, int rewards) {
        this.id = id;
        this.fullname = fullname;
        this.username = username;
        this.lessons = lessons;
        this.rewards = rewards;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullname() { return fullname; }
    public void setFullname(String fullname) { this.fullname = fullname; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public int getLessons() { return lessons; }
    public void setLessons(int lessons) { this.lessons = lessons; }
    public int getRewards() { return rewards; }
    public void setRewards(int rewards) { this.rewards = rewards; }
}


