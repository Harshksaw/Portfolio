export interface Project {
  id: number;
  title: string;
  type: 'web' | 'mobile' | 'tool' | 'innovative';
  category: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
  image: string;
  mobileScreenshots?: string[];
  webScreenshots?: string[];
  video?: string;
  color: string;
  featured?: boolean;
}

export interface DeviceMockupProps {
  project: Project;
}

export type ProjectType = 'All' | 'Web' | 'Mobile' | 'Tools' | 'Innovative';

export interface FilterButtonProps {
  type: ProjectType;
  isActive: boolean;
  onClick: () => void;
}