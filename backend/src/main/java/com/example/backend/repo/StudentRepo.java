package com.example.backend.repo;

import com.example.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student,String> {
    boolean existsByStudentNIC(String studentNIC);
    boolean existsByStudentRegNo(String studentRegNo);
    Student findByStudentRegNo(String studentRegNo);
    void deleteByStudentRegNo(String studentRegNo);

}
