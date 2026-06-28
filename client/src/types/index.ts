export interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'other';
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'archived';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export type Theme = 'dark' | 'light';
export type Language = 'uz' | 'en' | 'ru';

export interface RootState {
  theme: { mode: Theme };
  language: { lang: Language };
  favorites: { ids: string[] };
  sidebar: { isOpen: boolean };
}
