import { CoursePart } from '../types';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => (
  <>
    {props.courseParts.map((coursePart) => (
      <p key={crypto.randomUUID()}>
        {coursePart.name} {coursePart.exerciseCount}
      </p>
    ))}
  </>
);

export { Content };
