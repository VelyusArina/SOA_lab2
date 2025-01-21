package ru.arinaandsergei.soa.labworkmainservice.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ru.arinaandsergei.soa.labworkmainservice.DTO.LabworkDTO;
import ru.arinaandsergei.soa.labworkmainservice.DTO.SearchDTO;
import ru.arinaandsergei.soa.labworkmainservice.model.Difficulty;
import ru.arinaandsergei.soa.labworkmainservice.model.LabWork;
import ru.arinaandsergei.soa.labworkmainservice.repository.LabWorkRepository;
import jakarta.persistence.criteria.Predicate;

import java.time.ZonedDateTime;
import java.util.*;

@Service
public class LabWorkService {

    @Autowired
    private LabWorkRepository labWorkRepository;

    public LabWork addLabWork(LabworkDTO dto) {
        if (dto.getMinimalPoint() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Минимальное количество баллов должно быть больше 0");
        }

//        if (labWork.getId() != null && labWorkRepository.existsById(labWork.getId())) {
//            throw new ResponseStatusException(HttpStatus.CONFLICT, "Лабораторная работа с таким ID уже существует");
//        }
        LabWork labWork = new LabWork();
        labWork.setName(dto.getName());
        labWork.setCoordinates(dto.getCoordinates());
        labWork.setMinimalPoint(dto.getMinimalPoint());
        labWork.setDescription(dto.getDescription());
        labWork.setTunedInWorks(dto.getTunedInWorks());
        labWork.setDifficulty(dto.getDifficulty());
        labWork.setDiscipline(dto.getDiscipline());
        labWork.setCreationDate(ZonedDateTime.now());
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

    public List<LabWork> searchLabWorks(SearchDTO searchDTO) {

        Specification<LabWork> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList();

            if (searchDTO.getFilter() != null) {

                String field = searchDTO.getFilter().split(" = ")[0];
                String value = searchDTO.getFilter().split(" = ")[1];

                switch (field) {
                    case "id":
                        predicates.add(criteriaBuilder.equal(root.get("id"), Integer.parseInt(value)));
                        break;
                    case "name":
                        predicates.add(criteriaBuilder.like(root.get("name"), "%" + value + "%"));
                        break;
                    case "minimalPoint":
                        predicates.add(criteriaBuilder.equal(root.get("minimalPoint"), Double.parseDouble(value)));
                        break;
                    case "difficulty":
                        predicates.add(criteriaBuilder.equal(root.get("difficulty"), Difficulty.valueOf(value)));
                        break;
                    case "creationDate":
                        predicates.add(criteriaBuilder.equal(root.get("creationDate"), ZonedDateTime.parse(value)));
                        break;
                    case "tunedInWorks":
                        predicates.add(criteriaBuilder.equal(root.get("tunedInWorks"), Long.parseLong(value)));
                        break;
                    case "description":
                        predicates.add(criteriaBuilder.like(root.get("description"), "%" + value + "%"));
                        break;
                    default:
                        throw new IllegalArgumentException("Unknown filter field: " + field);
                }
            }


            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };


        Sort sort = Sort.unsorted();
        if (searchDTO.getSort() != null) {
            sort = Sort.by(Sort.Direction.ASC, searchDTO.getSort());
        }


        PageRequest pageRequest = PageRequest.of(
                searchDTO.getPage() != null ? searchDTO.getPage() : 0,
                searchDTO.getSize() != null ? searchDTO.getSize() : 10,
                sort
        );
        List<LabWork> labWorks = labWorkRepository.findAll(specification);
        if(Objects.equals(searchDTO.getFilter(), "name")) {labWorks.sort(Comparator.comparing(LabWork::getName));}
        if(Objects.equals(searchDTO.getFilter(), "minimalPoint")) {labWorks.sort(Comparator.comparing(LabWork::getMinimalPoint));}
        if(Objects.equals(searchDTO.getFilter(), "description")) {labWorks.sort(Comparator.comparing(LabWork::getDescription));}
        if(Objects.equals(searchDTO.getFilter(), "tunedInWorks")) {labWorks.sort(Comparator.comparing(LabWork::getTunedInWorks));}
        if(Objects.equals(searchDTO.getFilter(), "difficulty")) {labWorks.sort(Comparator.comparing(LabWork::getDifficulty));}



        int fromIndex = searchDTO.getPage()*searchDTO.getSize();
        int toIndex = fromIndex + searchDTO.getSize();

        if(!labWorks.isEmpty()){
            if(toIndex > labWorks.size()) {
                toIndex = labWorks.size();
            }
            if(fromIndex > labWorks.size()) {
                return new ArrayList<LabWork>();

            }
            List<LabWork> slicedList = labWorks.subList(fromIndex, toIndex);
            return slicedList;
        }
        else{
            return labWorks;
        }
    }

}
