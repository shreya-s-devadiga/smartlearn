package com.smartlearn.service;

import com.smartlearn.dto.RegisterRequest;
import com.smartlearn.model.User;
import com.smartlearn.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

  private final UserRepository repo;

  public UserService(UserRepository repo) {
    this.repo = repo;
  }

  // ✅ REGISTER USER
  @Transactional
  public User register(RegisterRequest req) {
    if (repo.existsByUsername(req.getUsername()))
      throw new RuntimeException("Username already taken");

    if (repo.existsByEmail(req.getEmail()))
      throw new RuntimeException("Email already in use");

    User u = new User();
    u.setFullname(req.getFullname());
    u.setEmail(req.getEmail());
    u.setUsername(req.getUsername());
    u.setPasswordHash(BCrypt.hashpw(req.getPassword(), BCrypt.gensalt()));
    u.setRole(req.getRole() != null ? req.getRole() : "USER");

    return repo.save(u);
  }

  // ✅ LOGIN USER (checks username + password)
  public User login(String username, String password) {
    User user = repo.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (!BCrypt.checkpw(password, user.getPasswordHash())) {
      throw new RuntimeException("Invalid credentials");
    }

    return user;
  }
}
