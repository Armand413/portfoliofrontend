export type ProjectCategory = 'BACKEND' | 'FRONTEND' | 'FULLSTACK' | 'CYBERSECURITE' | 'OUTIL' | 'AUTRE';

export interface ProjectImage {
  id: number;
  fileName: string;
  displayOrder: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string;
  githubUrl: string;
  demoUrl: string;
  category: ProjectCategory;
  createdAt: string;
  images: ProjectImage[];
}

export interface ProjectRequest {
  title: string;
  description: string;
  techStack: string;
  githubUrl: string;
  demoUrl: string;
  category: ProjectCategory;
}