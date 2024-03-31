package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentDTO {
    private String studentRegNo;
    private String studentFirstName;
    private String studentLastName;
    private String studentAddress;
    private String studentDegreeCode;
    private String studentDOB;
    private String studentNIC;
    private String studentIntake;
    private List<String> ongoingCourses;
    private List<String> completedCourses;
}
