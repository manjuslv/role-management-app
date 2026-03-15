package com.myapp.role_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    // POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody AppUser user) {
        
        // Check if username already exists
        if (appUserRepository.findByUsername(user.getUsername()).isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Username already exists!");
            return ResponseEntity.badRequest().body(response);
        }

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user to database
        appUserRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully!");
        return ResponseEntity.ok(response);
    }

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody AppUser user) {

        try {
            // Verify username and password
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    user.getUsername(),
                    user.getPassword()
                )
            );

            // Generate JWT token
            String token = jwtUtil.generateToken(user.getUsername());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid username or password!");
            return ResponseEntity.badRequest().body(response);
        }
    }
}