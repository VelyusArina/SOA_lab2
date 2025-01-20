package ru.arinaandsergei.soa.labworkmainservice.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ru.arinaandsergei.soa.labworkmainservice.model.LabWork;
import ru.arinaandsergei.soa.labworkmainservice.repository.LabWorkRepository;

@Service
public class LabWorkService {

    @Autowired
    private LabWorkRepository labWorkRepository;

    public LabWork addLabWork(LabWork labWork) {
        if (labWork.getMinimalPoint() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Минимальное количество баллов должно быть больше 0");
        }

        if (labWork.getId() != null && labWorkRepository.existsById(labWork.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Лабораторная работа с таким ID уже существует");
        }

        return labWorkRepository.save(labWork);
    }

    public LabWork getLabWorkById(Integer id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID не может быть null");
        }

        return labWorkRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Лабораторная работа не найдена"));
    }

    public LabWork updateLabWorkById(Integer id, LabWork updatedLabWork) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("ID must be greater than 0");
        }

        LabWork existingLabWork = labWorkRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("LabWork with ID " + id + " not found"));

        existingLabWork.setName(updatedLabWork.getName());
        existingLabWork.setCoordinates(updatedLabWork.getCoordinates());
        existingLabWork.setMinimalPoint(updatedLabWork.getMinimalPoint());
        existingLabWork.setDescription(updatedLabWork.getDescription());
        existingLabWork.setTunedInWorks(updatedLabWork.getTunedInWorks());
        existingLabWork.setDifficulty(updatedLabWork.getDifficulty());
        existingLabWork.setDiscipline(updatedLabWork.getDiscipline());

        return labWorkRepository.save(existingLabWork);
    }

    public void deleteLabWorkById(Integer id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("ID must be greater than 0");
        }

        LabWork labWork = labWorkRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("LabWork with ID " + id + " not found"));

        labWorkRepository.delete(labWork);
    }
}
