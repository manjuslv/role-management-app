package com.myapp.role_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleRepository repo;

    // GET /api/roles → returns ALL roles
    @GetMapping
    public List<Role> getAll() {
        return repo.findAll();
    }

    // GET /api/roles/1 → returns role with id=1
    @GetMapping("/{id}")
    public Role getOne(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    // POST /api/roles → creates a new role
    @PostMapping
    public Role create(@RequestBody Role role) {
        return repo.save(role);
    }

    // PUT /api/roles/1 → updates role with id=1
    @PutMapping("/{id}")
    public Role update(@PathVariable Long id, @RequestBody Role updated) {
        updated.setId(id);
        return repo.save(updated);
    }

    // DELETE /api/roles/1 → deletes role with id=1
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}