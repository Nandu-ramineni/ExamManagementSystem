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

export const UserRegister = async(data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, data);
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

export const getUsers = async() => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/auth/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const deleteUserById = async(id) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(`${API_URL}/auth/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const getStudents = async() => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/auth/students`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const getTeachers = async() => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/auth/staff`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}