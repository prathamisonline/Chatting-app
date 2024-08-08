import axios from "axios";

// const url = import.meta.env.VITE_URL;
const url = "http://localhost:4000/api/";



export const createData = async ({ userData, endpoints }) => {
    try {
        const { data } = await axios.post(`${url}auth/signup`, userData);
        return data;
    } catch (error) {
        throw error.response || error.response.message;
    }
};

export const loginUser = async ({ userData, endpoints }) => {
    try {
        const { data } = await axios.post(`${url}${endpoints}`, userData);
        return data;
    } catch (error) {
        throw error.response || error.response.message;
    }
};

export const getData = async (endpoints) => {
    try {
        const { data } = await axios.get(`${url}${endpoints}`);
        return data;
    } catch (error) {
        throw error.response || error.response.data.message;
    }
};

export const deleteData = async (endpoints) => {
    try {
        const { data } = await axios.delete(`${url}${endpoints}`);
        return data;
    } catch (error) {
        throw error.response || error.response.message;
    }
};

export const updateData = async ({ userData, endpoints }) => {
    try {
        const { data } = await axios.put(`${url}${endpoints}`, userData);
        return data;
    } catch (error) {
        throw error.response || error.response.message;
    }
};
