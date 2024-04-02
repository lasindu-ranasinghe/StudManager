package com.example.backend.service;

import com.example.backend.dto.CourseDTO;
import com.example.backend.dto.StudentDTO;
import com.example.backend.entity.Course;
import com.example.backend.entity.Student;
import com.example.backend.repo.CourseRepo;
import com.example.backend.repo.StudentRepo;
import com.example.backend.util.VarList;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class StudentServices {

    @Autowired
    private StudentRepo studentRepo;
    @Autowired
    private CourseRepo couseRepo;

    @Autowired
    private ModelMapper modelMapper;


    public Map<String, Object> saveStudent(StudentDTO studentDTO){
        Map<String, Object> response = new HashMap<>();

        if (studentRepo.existsByStudentNIC(studentDTO.getStudentNIC())){
            response.put("status", VarList.RSP_DUPLICATED);
        }else {
            //Mapping the DTO and Entity
            Student entity = modelMapper.map(studentDTO, Student.class);
            entity.setOngoingCourses(studentDTO.getOngoingCourses());
            entity.setCompletedCourses(studentDTO.getCompletedCourses());
            studentRepo.save(entity);

            //Updating Reg No
            Integer maxStudentId = entity.getStudentId();
            String customId = studentDTO.getStudentIntake() + "-" + studentDTO.getStudentDegreeCode() + "-" + (maxStudentId);
            entity.setStudentRegNo(customId);
            studentRepo.save(entity);

            // Setting response
            response.put("status", VarList.RSP_SUCCESS);
            response.put("customId", customId);
        }
        return response;
    }
    public List<StudentDTO> getAllStudents(){
        List<Student> studentList = studentRepo.findAll();
        return modelMapper.map(studentList,new TypeToken<ArrayList<StudentDTO>>(){
        }.getType());
    }

    public StudentDTO searchStudent(String studentRegNo){
        if (studentRepo.existsByStudentRegNo(studentRegNo)){
            Student student =studentRepo.findByStudentRegNo(studentRegNo);
            return modelMapper.map(student,StudentDTO.class);
        }else {
            return null;
        }
    }

    public String updateStudent(StudentDTO studentDTO) {
        String studentRegNo = studentDTO.getStudentRegNo();
        if (studentRegNo != null && !studentRegNo.isEmpty()) {
            if (studentRepo.existsByStudentRegNo(studentRegNo)) {
                Student existingStudent = studentRepo.findByStudentRegNo(studentRegNo);
                // Update existing student entity with values from studentDTO
                modelMapper.map(studentDTO, existingStudent);
                // Update ongoingCourses and completedCourses
                existingStudent.setOngoingCourses(studentDTO.getOngoingCourses());
                existingStudent.setCompletedCourses(studentDTO.getCompletedCourses());

                studentRepo.save(existingStudent);
                return VarList.RSP_SUCCESS;
            } else {
                return VarList.RSP_NO_DATA_FOUND;
            }
        } else {
            return VarList.RSP_ERROR;
        }
    }
    public String deleteStudent(String studentRegNo){
        if (studentRepo.existsByStudentRegNo(studentRegNo)){
            studentRepo.deleteByStudentRegNo(studentRegNo);
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }

    public List<CourseDTO> findOngoingCoursesForStudent(String studentRegNo) {
        if (studentRepo.existsByStudentRegNo(studentRegNo)){
            Student student =studentRepo.findByStudentRegNo(studentRegNo);
            List<String> ongoingCourseCodes = student.getOngoingCourses();
            List<Course> courseList = couseRepo.findByCourseCodeIn(ongoingCourseCodes);
            return modelMapper.map(courseList, new TypeToken<List<CourseDTO>>() {}.getType());
        }else {
            return null;
        }
    }
    public List<CourseDTO> findCompletedCoursesForStudent(String studentRegNo) {
        if (studentRepo.existsByStudentRegNo(studentRegNo)){
            Student student =studentRepo.findByStudentRegNo(studentRegNo);
            List<String> completedCodes = student.getCompletedCourses();
            List<Course> courseList = couseRepo.findByCourseCodeIn(completedCodes);
            return modelMapper.map(courseList, new TypeToken<List<CourseDTO>>() {}.getType());
        }else {
            return null;
        }
    }
}
