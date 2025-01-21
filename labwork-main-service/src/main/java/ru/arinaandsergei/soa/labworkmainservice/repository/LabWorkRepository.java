package ru.arinaandsergei.soa.labworkmainservice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import ru.arinaandsergei.soa.labworkmainservice.DTO.GroupCountDTO;
import ru.arinaandsergei.soa.labworkmainservice.model.Difficulty;
import ru.arinaandsergei.soa.labworkmainservice.model.LabWork;

import java.util.List;


public interface LabWorkRepository extends JpaRepository<LabWork, Integer>, JpaSpecificationExecutor<LabWork> {

    List<LabWork> findAll(Specification<LabWork> specification);
    List<LabWork> findByDifficulty(Difficulty difficulty);

    @Query("SELECT new ru.arinaandsergei.soa.labworkmainservice.DTO.GroupCountDTO(l.description, COUNT(l)) " +
            "FROM LabWork l " +
            "GROUP BY l.difficulty")
    List<GroupCountDTO> countByDescriptionGroup();

    LabWork findFirstByOrderByTunedInWorksAsc();
    long countByMinimalPointLessThan(double minimalPoint);


}
