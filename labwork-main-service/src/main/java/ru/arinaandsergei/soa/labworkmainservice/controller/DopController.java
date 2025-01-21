package ru.arinaandsergei.soa.labworkmainservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ru.arinaandsergei.soa.labworkmainservice.DTO.GroupCountDTO;
import ru.arinaandsergei.soa.labworkmainservice.model.LabWork;
import ru.arinaandsergei.soa.labworkmainservice.service.DopService;

import java.util.List;

@RestController
@RequestMapping("/api/labworks")
public class DopController {
    private final DopService dopService;

    @Autowired
    public DopController(DopService dopService) {
        this.dopService = dopService;
    }


    @GetMapping("/max-tuned-in")
    public ResponseEntity<LabWork> getMaxTunedIn() {
        LabWork labWork = dopService.maxTunedIn();
        return ResponseEntity.ok(labWork);
    }

    @GetMapping("/group-by-description")
    public ResponseEntity<List<GroupCountDTO>> getGroupByDescription() {
        return ResponseEntity.ok(dopService.groupByDescription());
    }
    @GetMapping("/count/minimal")
    public ResponseEntity<Long> getMinimalByCount(@RequestBody Double minimal) {
        Long count = dopService.getCountByMinimal(minimal);
        return ResponseEntity.ok(count);
    }



}

