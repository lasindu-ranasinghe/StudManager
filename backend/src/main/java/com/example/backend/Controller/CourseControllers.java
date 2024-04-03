package com.example.backend.Controller;

import com.example.backend.dto.CourseDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.dto.StudentDTO;
import com.example.backend.service.CourseServices;
import com.example.backend.service.StudentServices;
import com.example.backend.util.VarList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("api/courses")
public class CourseControllers {
    //    EndPoints:
    //    1). Get all courses for a student:    GET   : /api/courses/getAllStudents

    Logger logger = LoggerFactory.getLogger(CourseControllers.class);
    @Autowired
    private CourseServices courseService;
    @Autowired
    private StudentServices studentService;
    @Autowired
    private ResponseDTO responseDTO;
    @GetMapping("/getAllCourses/{degreeCode}")
    public ResponseEntity getAllCourses(@PathVariable String degreeCode) {
        logger.info("Received request to get all courses for degree code: {}", degreeCode);

        try {
            List<CourseDTO> courseDTOList = courseService.getAllCourses(degreeCode);

            logger.info("Retrieved {} courses for degree code: {}", courseDTOList.size(), degreeCode);

            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(courseDTOList);

            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            logger.error("Error occurred while retrieving courses for degree code {}: {}", degreeCode, ex.getMessage());

            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);

            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/getAllCoursesOfUser/{studRegNumber}")
    public ResponseEntity getAllCoursesOfUser(@PathVariable String studRegNumber) {
        logger.info("Received request to get all courses of user with registration number: {}", studRegNumber);

        try {
            List<CourseDTO> ongoingList = studentService.findOngoingCoursesForStudent(studRegNumber);
            List<CourseDTO> completedList = studentService.findCompletedCoursesForStudent(studRegNumber);

            logger.info("Retrieved ongoing courses: {}", ongoingList);
            logger.info("Retrieved completed courses: {}", completedList);

            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(ongoingList);

            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            logger.error("Error occurred while retrieving courses for user with registration number {}: {}", studRegNumber, ex.getMessage());

            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);

            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/logs")
    public String getLogs() throws IOException {
        // Specify the path to your log file
        String filePath = "appLog.log";

        // Use ClassPathResource to access the file
        ClassPathResource resource = new ClassPathResource(filePath);

        // Read the content of the file
        try (InputStream inputStream = resource.getInputStream()) {
            return StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
        }
    }

}
