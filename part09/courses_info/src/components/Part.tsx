import { CoursePart } from '../types';
import { assertNever } from '../utils';

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  const part = props.part;
  let content;
  switch (part.kind) {
    case 'basic':
      content = <p>{part.description}</p>;
      break;
    case 'background':
      content = (
        <>
          <p>{part.description}</p>
          <p>
            Background:{' '}
            <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </p>
        </>
      );
      break;
    case 'group':
      content = <p>Project Exercises: {part.groupProjectCount}</p>;
      break;
    case 'special':
      content = (
        <>
          <p>{part.description}</p>
          <p>
            Required skills:{' '}
            {part.requirements.map((req, index, reqs) => {
              if (index < reqs.length - 1) {
                return req + ', ';
              } else {
                return req;
              }
            })}
          </p>
        </>
      );
      break;
    default:
      return assertNever(part);
  }
  return (
    <article>
      <h2>
        {part.name} {part.exerciseCount}
      </h2>
      {content}
    </article>
  );
};

export { Part };
