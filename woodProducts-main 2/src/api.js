import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const loginAPI = async (username, password) => {
    const response = await axios.post(`${BASE_URL}/v1/login/`, {
        username,
        password
    });
    return response.data;
};

export const registerAPI = async (username, password, email) => {
    const response = await axios.post(`${BASE_URL}/v1/register/`, {
        username,
        password,
        email
    });
    return response.data;
};

export const getMeProfileAPI = async (token) => {
    const response = await axios.get(`${BASE_URL}/v1/me/profile/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getOrdersAPI = async (token) => {
    const response = await axios.get(`${BASE_URL}/orders/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getWishlistAPI = async (token) => {
    const response = await axios.get(`${BASE_URL}/wishlist/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getCartAPI = async (token) => {
    const response = await axios.get(`${BASE_URL}/cart/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};


export const fetchCategoriesAPI = async () => {
    const response = await axios.get(`${BASE_URL}/categories/`);
    return response.data;
};

export const fetchProductsAPI = async (filters) => {
    const {category, min_price, max_price, page} = filters;
    const params = {
        category,
        min_price,
        max_price,
        page,
    };

    Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);

    const response = await axios.get(`${BASE_URL}/products/`, {params});
    return response.data;
};

export const fetchProductByIdAPI = async (id) => {
    const response = await axios.get(`${BASE_URL}/products/${id}/`);
    return response.data;
};

export const addToWishlist = async (productId, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/wishlist/`, {
            product: productId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to add to wishlist:", error.response?.data || error.message);
        throw error;
    }
};

export const removeFromWishlist = async (wishlistId, token) => {
    try {
        const response = await axios.delete(`${BASE_URL}/wishlist/${wishlistId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to remove from wishlist:", error.response?.data || error.message);
        throw error;
    }
};

export const checkWishlistStatus = async (productId, token) => {
    const response = await axios.get(`${BASE_URL}/wishlist/status/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; // Return the status data
};
