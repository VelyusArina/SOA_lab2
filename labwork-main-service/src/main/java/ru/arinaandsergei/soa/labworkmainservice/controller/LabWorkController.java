package ru.arinaandsergei.soa.labworkmainservice.controller;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.arinaandsergei.soa.labworkmainservice.DTO.LabworkDTO;
import ru.arinaandsergei.soa.labworkmainservice.DTO.SearchDTO;
import ru.arinaandsergei.soa.labworkmainservice.model.LabWork;
import ru.arinaandsergei.soa.labworkmainservice.service.LabWorkService;

import java.util.List;

@RestController
@RequestMapping("/api/labworks")
public class LabWorkController {
    private final LabWorkService labWorkService;

    @Autowired
    public LabWorkController(LabWorkService labWorkService) {
        this.labWorkService = labWorkService;
    }

    @PostMapping
    public ResponseEntity<LabWork> addLabWork(@RequestBody LabworkDTO dto) {
        LabWork createdLabWork = labWorkService.addLabWork(dto);
        return new ResponseEntity<>(createdLabWork, HttpStatus.CREATED);
    }

    @GetMapping(consumes = MediaType.APPLICATION_XML_VALUE, produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<List<LabWork>> getLabWorks(@RequestBody SearchDTO dto) {
        List<LabWork> labWorks = labWorkService.searchLabWorks(dto);
        return ResponseEntity.ok(labWorks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabWork> getLabWorkById(@PathVariable Integer id) {
        LabWork labWork = labWorkService.getLabWorkById(id);
        return ResponseEntity.ok(labWork);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LabWork> updateLabWork(
            @PathVariable("id") Integer id,
            @RequestBody @Valid LabWork updatedLabWork) {
        try {
            LabWork labWork = labWorkService.updateLabWorkById(id, updatedLabWork);
            return ResponseEntity.ok(labWork);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLabWork(@PathVariable("id") Integer id) {
        try {
            labWorkService.deleteLabWorkById(id);
            return ResponseEntity.ok("LabWork with ID " + id + " has been deleted.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

}

