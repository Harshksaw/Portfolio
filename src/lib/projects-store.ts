import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/projects.json");

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  type: string;
  description: string[];
  techStack: string[];
  image: string[];
  demoUrl?: string;
  repoUrl?: string;
}

function read(): Project[] {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function write(projects: Project[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2));
}

export function getAll(): Project[] {
  return read();
}

export function getById(id: string): Project | undefined {
  return read().find((p) => p.id === id);
}

export function create(data: Omit<Project, "id">): Project {
  const projects = read();
  const project: Project = { id: crypto.randomUUID(), ...data };
  projects.push(project);
  write(projects);
  return project;
}

export function update(id: string, data: Partial<Omit<Project, "id">>): Project | null {
  const projects = read();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  projects[idx] = { ...projects[idx], ...data };
  write(projects);
  return projects[idx];
}

export function remove(id: string): boolean {
  const projects = read();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  write(filtered);
  return true;
}
