package com.example.backend.Controller;

import com.example.backend.dto.CourseDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.CourseServices;
import com.example.backend.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/courses")
public class CourseControllers {
    //    EndPoints:
    //    1). Get all courses for a student:    GET   : /api/courses/getAllStudents

    @Autowired
    private CourseServices courseService;
    @Autowired
    private ResponseDTO responseDTO;
    @GetMapping("/getAllStudents")
    public ResponseEntity getAllStudents(){
        try {
            List<CourseDTO> courseDTOList = courseService.getAllCourses();
            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(courseDTOList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        }catch (Exception ex){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

}
