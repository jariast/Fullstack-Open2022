export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartDetailed extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDetailed {
  kind: 'basic';
}
interface CoursePartBackground extends CoursePartDetailed {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CoursePartDetailed {
  requirements: string[];
  kind: 'special';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartSpecial
  | CoursePartBackground;
