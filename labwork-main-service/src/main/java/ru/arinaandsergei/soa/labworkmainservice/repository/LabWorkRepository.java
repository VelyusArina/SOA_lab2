package ru.arinaandsergei.soa.labworkmainservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.arinaandsergei.soa.labworkmainservice.model.Difficulty;
import ru.arinaandsergei.soa.labworkmainservice.model.LabWork;

import java.util.List;
import java.util.Optional;

public interface LabWorkRepository extends JpaRepository<LabWork, Integer> {
    Optional<LabWork> findById(Integer id);

    // Фильтрация по сложности
    List<LabWork> findByDifficulty(Difficulty difficulty);


}
