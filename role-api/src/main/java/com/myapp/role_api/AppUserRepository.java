package com.myapp.role_api;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    
    // Find user by username
    Optional<AppUser> findByUsername(String username);
}