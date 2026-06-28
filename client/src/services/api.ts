import axios from 'axios';
import type { Project, ApiResponse } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// Fallback mock data when API is unavailable
export const MOCK_PROJECTS: Project[] = [
  {
    _id: '1',
    title: 'Calculator App',
    description: 'Modern and responsive calculator web application with clean UI and smooth animations.',
    longDescription: 'A fully functional calculator built with modern web technologies. Features a clean, responsive design with keyboard support, smooth button animations, and accurate mathematical operations. Deployed on Vercel.',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'frontend',
    githubUrl: 'https://github.com',
    liveUrl: 'https://canculator-six.vercel.app/',
    featured: true,
    status: 'completed',
    order: 1,
    createdAt: '2024-06-01T00:00:00.000Z',
    updatedAt: '2024-06-01T00:00:00.000Z',
  },
];

export interface ProjectFilters {
  category?: string;
  status?: string;
  featured?: boolean;
  search?: string;
  sort?: string;
}

export const projectsApi = {
  getAll: (filters?: ProjectFilters) =>
    api.get<ApiResponse<Project[]>>('/projects', { params: filters }).then((r) => r.data),

  getById: (id: string) =>
    api.get<ApiResponse<Project>>(`/projects/${id}`).then((r) => r.data),

  create: (data: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>) =>
    api.post<ApiResponse<Project>>('/projects', data).then((r) => r.data),

  update: (id: string, data: Partial<Project>) =>
    api.put<ApiResponse<Project>>(`/projects/${id}`, data).then((r) => r.data),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/projects/${id}`).then((r) => r.data),
};

export default api;
