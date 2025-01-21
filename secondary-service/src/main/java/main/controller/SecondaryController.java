package main.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.exception.AppException;
import main.service.SecondaryService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/bars")
@AllArgsConstructor
@Slf4j
public class SecondaryController {
    private final SecondaryService secondaryService;

    @PostMapping(value ="/labwork/{labwork_id}/difficulty/decrease/{steps_count}", consumes = MediaType.APPLICATION_XML_VALUE, produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<?> decreaseDifficulty(@PathVariable Long labwork_id, @PathVariable Long steps_count) throws AppException {
        return ResponseEntity.ok(secondaryService.decreaseDifficulty(labwork_id, steps_count));
    }

    @PostMapping(value = "/discipline/{discipline_id}/labwork/{labwork_id}/remove", consumes = MediaType.APPLICATION_XML_VALUE, produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<?> deleteLabwork(@PathVariable Long discipline_id, @PathVariable Long labwork_id) throws AppException {
        secondaryService.deleteLabwork(discipline_id, labwork_id);
        return ResponseEntity.ok().build();
    }
}
