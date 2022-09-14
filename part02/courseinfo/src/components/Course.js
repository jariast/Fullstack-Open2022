import React from 'react';

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part part={part} key={part.id}></Part>
    ))}
  </>
);

const Course = ({ course }) => {
  const total = course.parts.reduce((accu, part) => accu + part.exercises, 0);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </div>
  );
};

export default Course;
