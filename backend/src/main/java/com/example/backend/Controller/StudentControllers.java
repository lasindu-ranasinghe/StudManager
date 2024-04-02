package com.example.backend.Controller;

import com.example.backend.dto.ResponseDTO;
import com.example.backend.dto.StudentDTO;
import com.example.backend.service.StudentServices;
import com.example.backend.util.VarList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/student")
public class StudentControllers {
//    EndPoints:
//    1). Register student:    POST   : /api/student/saveStudent
//    2). Fetch all students:  GET    : /api/student/getAllStudents
//    3). Search students:     GET    : /api/student/searchStudent/{studentRegNo}
//    4). Update student:      PUT    : /api/student//updateStudent
//    5). Delete student:      DELETE : /api/student/deleteStudent/{studentRegNo}

    Logger logger = LoggerFactory.getLogger(StudentControllers.class);
    @Autowired
    private StudentServices StudentService;
    @Autowired
    private ResponseDTO responseDTO;

    @PostMapping(value = "/saveStudent")
    public ResponseEntity saveStudent(@RequestBody StudentDTO studentDTO) {
        logger.info("Received request to save student: {}", studentDTO);

        try {
            Map<String, Object> response = StudentService.saveStudent(studentDTO);
            String status = (String) response.get("status");
            String customId = (String) response.get("customId");

            logger.info("Save student response status: {}", status);

            if (status.equals("00")) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                studentDTO.setStudentRegNo(customId);
                responseDTO.setContent(studentDTO);
                logger.info("Student saved successfully with customId: {}", customId);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

            } else if (status.equals("06")) {
                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("Employee Registered");
                responseDTO.setContent(studentDTO);
                logger.warn("Duplicate student registration: {}", studentDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            } else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Error");
                responseDTO.setContent(null);
                logger.error("Failed to save student. Status: {}", status);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            logger.error("Error occurred while saving student: {}", ex.getMessage());
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAllStudents")
    public ResponseEntity getAllStudents() {
        logger.info("Received request to get all students.");

        try {
            List<StudentDTO> studentDTOList = StudentService.getAllStudents();
            logger.info("Retrieved {} students from the database.", studentDTOList.size());

            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(studentDTOList);

            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);

            logger.error("Error occurred while retrieving all students: {}", ex.getMessage());
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/searchStudent/{studentRegNo}")
    public ResponseEntity searchStudent(@PathVariable String studentRegNo) {
        logger.info("Received request to search student with registration number: {}", studentRegNo);

        try {
            StudentDTO studentDTO = StudentService.searchStudent(studentRegNo);

            if (studentDTO != null) {
                logger.info("Student with registration number {} found.", studentRegNo);

                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(studentDTO);

                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else {
                logger.warn("No student found for registration number: {}", studentRegNo);

                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No student available for this registration number.");
                responseDTO.setContent(null);

                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error occurred while searching student with registration number {}: {}", studentRegNo, e.getMessage());

            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(e);

            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/updateStudent")
    public ResponseEntity updateStudent(@RequestBody StudentDTO studentDTO) {
        logger.info("Received request to update student: {}", studentDTO);

        try {
            String res = StudentService.updateStudent(studentDTO);

            if (res.equals("00")) {
                logger.info("Student updated successfully.");

                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(studentDTO);

                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else if (res.equals("01")) {
                logger.warn("Attempted to update non-existing student.");

                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("Not a registered student.");
                responseDTO.setContent(studentDTO);

                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            } else {
                logger.error("Failed to update student.");

                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Error");
                responseDTO.setContent(null);

                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception ex) {
            logger.error("Error occurred while updating student: {}", ex.getMessage());

            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);

            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/deleteStudent/{studentRegNo}")
    public ResponseEntity deleteStudent(@PathVariable String studentRegNo) {
        logger.info("Received request to delete student with registration number: {}", studentRegNo);

        try {
            String res = StudentService.deleteStudent(studentRegNo);

            if (res.equals("00")) {
                logger.info("Student deleted successfully.");

                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(null);

                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else {
                logger.warn("No student found for registration number: {}", studentRegNo);

                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No student available for this registration number.");
                responseDTO.setContent(null);

                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error occurred while deleting student with registration number {}: {}", studentRegNo, e.getMessage());

            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(e);

            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

