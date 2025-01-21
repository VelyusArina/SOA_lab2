package main.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.adapter.LabworkServiceAdapter;
import main.exception.AppException;
import main.model.Difficulty;
import main.model.LabWork;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;


@Component
@AllArgsConstructor
@Slf4j
public class SecondaryService {
    private final LabworkServiceAdapter labworkServiceAdapter;

    public LabWork decreaseDifficulty(Long labwork_id, Long steps_count) throws AppException {
        LabWork labwork = labworkServiceAdapter.getById(labwork_id);
        Difficulty difficulty = labwork.getDifficulty();
        for(long i = 0; i < steps_count; i++){

            switch(labwork.getDifficulty()){
                case NORMAL -> throw new AppException(HttpStatus.CONFLICT, "Нельзя понизить сложность на такое количество шагов");
                case HARD -> difficulty=Difficulty.NORMAL;
                case VERY_HARD -> difficulty=Difficulty.HARD;
                case IMPOSSIBLE -> difficulty=Difficulty.VERY_HARD;
                case TERRIBLE -> difficulty=Difficulty.IMPOSSIBLE;
            }
        }
        labwork.setDifficulty(difficulty);
        labworkServiceAdapter.putById(labwork_id, labwork);
        return labwork;
    }

    public void deleteLabwork(Long discipline_id, @PathVariable Long labwork_id) throws AppException {
        try {
            labworkServiceAdapter.deleteById(labwork_id);
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }
}
