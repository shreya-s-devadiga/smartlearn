package com.smartlearn.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RegisterRequest {

    @NotBlank
    private String fullname;

    @Email
    private String email;

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    // ✅ NEW FIELD (optional)
    private String role; // if empty → default USER
}
