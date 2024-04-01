package com.example.backend.repo;

import com.example.backend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepo extends JpaRepository<Course,String> {
    @Query("SELECT c FROM Course c JOIN c.includedDegrees d WHERE d = :degreeCode")
    List<Course> findByIncludedDegreesContaining(@Param("degreeCode") String degreeCode);
}