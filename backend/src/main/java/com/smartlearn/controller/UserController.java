package com.smartlearn.controller;

import com.smartlearn.dto.LoginRequest;
import com.smartlearn.dto.RegisterRequest;
import com.smartlearn.model.User;
import com.smartlearn.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserService service;
  public UserController(UserService service){ this.service = service; }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody RegisterRequest req){
    try{
      User u = service.register(req);
      return ResponseEntity.ok(new PublicUser(u));
    }catch(Exception e){
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest req){
  try{
    User u = service.login(req.getUsername(), req.getPassword());
    return ResponseEntity.ok(new PublicUser(u));
  }catch(Exception e){
    return ResponseEntity.status(401).body("Invalid credentials");
  }
}


  // ✅ Updated to include ROLE field
  record PublicUser(Long id, String fullname, String email, String username, String role){
  PublicUser(User u){
    this(u.getId(), u.getFullname(), u.getEmail(), u.getUsername(), u.getRole());
  }
}

}
