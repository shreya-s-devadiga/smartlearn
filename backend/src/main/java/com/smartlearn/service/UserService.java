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
  public UserService(UserRepository repo){ this.repo = repo; }

  @Transactional
  public User register(RegisterRequest req){
    if(repo.existsByUsername(req.getUsername())) throw new RuntimeException("Username taken");
    if(repo.existsByEmail(req.getEmail())) throw new RuntimeException("Email taken");
    User u = new User();
    u.setFullname(req.getFullname());
    u.setEmail(req.getEmail());
    u.setUsername(req.getUsername());
    u.setPasswordHash(BCrypt.hashpw(req.getPassword(), BCrypt.gensalt()));
    return repo.save(u);
  }

  public User login(String username, String password){
    return repo.findByUsername(username)
      .filter(u -> BCrypt.checkpw(password, u.getPasswordHash()))
      .orElseThrow(() -> new RuntimeException("Invalid credentials"));
  }
}