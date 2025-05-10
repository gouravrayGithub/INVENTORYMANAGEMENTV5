package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UserDto;  // Create this DTO class for the request body
import com.example.demo.service.AuthService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

   
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody UserDto userDto) {
        String result = authService.register(userDto.getEmail(), userDto.getPassword(), userDto.getRole());

        Map<String, String> response = new HashMap<>();
        response.put("message", result);

        if (result.equals("User registered successfully")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        boolean success = authService.login(loginRequest.getEmail(), loginRequest.getPassword());

        Map<String, String> response = new HashMap<>();
        if (success) {
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(401).body(response);
        }
    }
    @GetMapping("/role")
    public ResponseEntity<Map<String, String>> getRole(@RequestParam String email) {
        String role = authService.getRoleByEmail(email);

        Map<String, String> response = new HashMap<>();
        if (role != null) {
            response.put("role", role);
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "User not found");
            return ResponseEntity.status(404).body(response);
        }
    }


}
