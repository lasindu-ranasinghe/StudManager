package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

}
