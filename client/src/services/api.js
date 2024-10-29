import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const UserLogin = async(data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, data);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const getProfile = async(id) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/auth/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const getExams = async() => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/exams`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const getExam = async(id) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/exams/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const getQuestionsByExam = async(id) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/questions/exam/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const submitAnswers = async(data) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${API_URL}/results/publish`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const createExam = async(data) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${API_URL}/exams/create`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const addQuestion = async(data) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${API_URL}/questions/add`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }   
}

export const getResultByStudent = async(examId, studentId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/results/${examId}/${studentId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}