export const getApiUrl = (): string => {
    
    return "http://localhost:3000";

};

export const API_BASE_URL = getApiUrl();

export const API_ENDPOINTS = {

    LOGIN: `${API_BASE_URL}/login`,

    USUARIOS: `${API_BASE_URL}/users`,

    POSTS: `${API_BASE_URL}/posts`,

    COMENTARIOS: `${API_BASE_URL}/comments`,
};