import { CoursePart } from '../types';
import { Part } from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => (
  <>
    {props.courseParts.map((coursePart) => (
      <Part key={crypto.randomUUID()} part={coursePart} />
    ))}
  </>
);

export { Content };
