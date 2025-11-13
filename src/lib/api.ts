import axios from 'axios';

const API_BASE_URL = 'https://api.simplyfound.com.na';

// Create axios instance with CORS configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
});



// Types
export interface Project {
  id?: number;
  projectName: string;
  projectDescription: string;
  clientName: string;
  projectType: string;
  projectAddress: string;
  startDate: string;
  completionDate: string;
  fileUrl: string;
  fileType: string;
  status: {
    id: number;
    statusname: string;
  };
}

export interface HeroSection {
  id?: number;
  // Backend sometimes returns "tittle"; we support both and prefer "title" in UI
  title?: string;
  tittle?: string;
  description: string;
  fileUrl: string;
  fileType: string;
}

export interface NewsItem {
  id?: number;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  createdDate: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}

// Auth API
export const authAPI = {
  login: (credentials: LoginCredentials) => {
    // Using URLSearchParams to send as form data instead of JSON
    const params = new URLSearchParams();
    params.append('email', credentials.username);
    params.append('password', credentials.password);
    
    return api.post<AuthResponse>('/api/users/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  },
  logout: () => api.post('/api/auth/logout'),
};

// Projects API
export const projectsAPI = {
  getAll: () => api.get<Project[]>("/api/projects/all"),
  getById: (id: number) => api.get<Project>(`/api/projects/${id}`),
  create: (formData: FormData) => api.post<Project>("/api/projects/upload", formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: number, formData: FormData) => api.put<Project>(`/api/projects/update/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: number) => api.delete(`/api/projects/delete/${id}`),
};

export const statusAPI = {
  getAll: () => api.get<{ id: number; statusname: string }[]>("/api/status/all"),
  getById: (id: number) => api.get<{ id: number; statusname: string }>(`/api/status/${id}`),
  // Add create, update, delete if needed.
};

// Hero Section API (matches backend API)
export const heroAPI = {
  getAll: () => api.get<HeroSection[]>("/api/hero/all"),
  getById: (id: number) => api.get<HeroSection>(`/api/hero/${id}`),
  // Hero endpoints expect multipart/form-data with fields: file, title, description
  create: (formData: FormData) =>
    api.post<HeroSection>("/api/hero/upload", formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id: number, formData: FormData) =>
    api.put<HeroSection>(`/api/hero/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id: number) => api.delete(`/api/hero/delete/${id}`),
};

// News API
export const newsAPI = {
  getAll: () => api.get<NewsItem[]>("/api/news/all"),
  getById: (id: number) => api.get<NewsItem>(`/api/news/${id}`),
  create: (formData: FormData) => api.post<NewsItem>("/api/news/upload", formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: number, formData: FormData) => api.put<NewsItem>(`/api/news/update/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: number) => api.delete(`/api/news/delete/${id}`),
};
