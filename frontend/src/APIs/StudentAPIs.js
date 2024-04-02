import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
    };
};

const getAllCourses = async (degreecode) => {
    try {
        const response = await axios.get(
            `/api/courses/getAllCourses/${degreecode}`,
            {
                headers: getHeaders(),
            }
        );
        return response.data.content;
    } catch (error) {
        console.error('Failed to fetch all courses:', error);
        throw error;
    }
};
const getOngoingCourses = async (studRegNumber) => {
    try {
        const response = await axios.get(
            `/api/courses/getAllCousesOfUser/${studRegNumber}`,
            {
                headers: getHeaders(),
            }
        );
        return response.data.content;
    } catch (error) {
        console.error('Failed to fetch all courses:', error);
        throw error;
    }
};

const getAllStudents = async () => {
    try {
        const response = await axios.get('/api/student/getAllStudents', {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
const getStudent = async (studRegNumber) => {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/student/searchStudent/${studRegNumber}`,
            {
                headers: getHeaders(),
            }
        );
        return response.data.content;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
const UpdateStudent = async (jsonObject) => {
    try {
        const response = await fetch(
            'http://localhost:8080/api/student/updateStudent',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonObject),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
};

// Use ES6 export syntax
export {
    getAllCourses,
    getAllStudents,
    getOngoingCourses,
    getStudent,
    UpdateStudent,
};
