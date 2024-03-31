package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentId;
    private String studentRegNo;
    private String studentFirstName;
    private String studentLastName;
    private String studentAddress;
    private String studentDegreeCode;
    private String studentDOB;
    private String studentNIC;
    private String studentIntake;

    @ElementCollection
    private List<String> ongoingCourses;
    @ElementCollection
    private List<String> completedCourses;
}
