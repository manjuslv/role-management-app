package com.myapp.role_api;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    // Nothing needed here!
    // Spring Data JPA generates all SQL automatically
}