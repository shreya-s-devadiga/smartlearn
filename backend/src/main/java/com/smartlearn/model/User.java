package com.smartlearn.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "users")
public class User {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String fullname;

  @Email
  @Column(unique = true)
  private String email;

  @Column(unique = true)
  @NotBlank
  private String username;

  @NotBlank
  private String passwordHash;

  @NotBlank
  private String role = "USER";   // ✅ Add this line
}
