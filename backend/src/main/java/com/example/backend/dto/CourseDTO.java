package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CourseDTO {
    private int courseId;
    private String courseCode;
    private String courseName;
    private int CourseCredits;
    private List<String> includedDegrees;
}