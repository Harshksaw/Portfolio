export interface Project {
  id: number;
  title: string;
  type: 'web' | 'mobile' | 'tool' | 'innovative';
  category: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
  video?: string;
  color: string;
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