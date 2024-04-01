package com.example.backend.service;

import com.example.backend.dto.CourseDTO;
import com.example.backend.entity.Course;
import com.example.backend.entity.Student;
import com.example.backend.repo.CourseRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CourseServices {

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private ModelMapper modelMapper;


    public List<CourseDTO> getAllCourses(String degreeCode){
        List<Course> courseList = courseRepo.findByIncludedDegreesContaining(degreeCode);
        return modelMapper.map(courseList,new TypeToken<ArrayList<CourseDTO>>(){
        }.getType());
    }

}
