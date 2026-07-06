export type SkillCategory = 'LANGAGE' | 'FRAMEWORK' | 'BASE_DE_DONNEES' | 'OUTIL' | 'SECURITE' | 'AUTRE';

export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  level: number;
  displayOrder: number;
}

export interface SkillRequest {
  name: string;
  category: SkillCategory;
  level: number;
  displayOrder: number;
}