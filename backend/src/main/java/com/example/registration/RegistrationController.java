package com.example.registration;

import jakarta.validation.Valid;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {
    private final RegistrationRepository registrations;

    public RegistrationController(RegistrationRepository registrations) {
        this.registrations = registrations;
    }

    @PostMapping
    public ResponseEntity<Registration> create(@Valid @RequestBody RegistrationRequest request) {
        Registration saved = registrations.save(new Registration(
                request.firstName().trim(),
                request.lastName().trim(),
                request.email().trim(),
                request.mobileNumber().trim()));
        return ResponseEntity.created(URI.create("/api/registrations/" + saved.getId())).body(saved);
    }
}
