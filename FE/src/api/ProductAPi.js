import axios from "axios";
import { toast } from "react-toastify";
const API_BASE_URL = "http://localhost:8080";

export const findAllProduct = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/product/findAllProduct`);
        return response.data;
    } catch (error) {
        toast.error("lỗi khi gọi api findAllProduct");
    }
};

export const findAllBrand = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/product/findAllBrand`)
        return response.data;
    }catch(error) {
        toast.error("lỗi khi gọi api findAllBrand")
    }
}

export const findAllSubCate = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/product/findAllSubCate`)
        return response.data;
    }catch(error) {
        toast.error("lỗi khi gọi api findAllSubCate")
    }
}

export const findAllCategory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/product/findAllCategory`)
        return response.data;
    }catch(error) {
        toast.error("lỗi khi gọi api findAllCategory")
    }
}

export const addProduct = async (product) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/product/addProduct`, product);
        return response;
    }catch(error) {
        toast.error("lỗi khi gọi api addProduct")
    }
}

export const updateProduct = async (product) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/product/updateProduct`, product);
        return response;
    }catch(error) {
        toast.error("lỗi khi gọi api updateProduct")
    }
}

export const findProductById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/product/findProductById/${id}`);
        return response.data;
    }catch(error) {
        toast.error("lỗi khi gọi api findProductById")
    }
}

export const filter = async (product) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/product/filter`, product);
        return response.data;
    }catch(error) {
        toast.error("lỗi khi gọi api filter")
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/product/deleteProduct/${id}`);
        return response.data;
    }catch(error) {
        toast.error("lỗi khi gọi api deleteProduct")
    }
}