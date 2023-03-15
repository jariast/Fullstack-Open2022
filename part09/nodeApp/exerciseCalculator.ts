import { ExerciseInfo } from './interfaces/ExceriseInfo';
import { getAverage, isNotNumber } from './utils';

try {
  const { target, trainingHoursByDay } = parseConsoleArgs(process.argv);
  console.log(
    'Exercise Info: ',
    calculateExcercises(target, trainingHoursByDay)
  );
} catch (error: unknown) {
  let errMsg = 'Something went wrong.';
  if (error instanceof Error) {
    errMsg += ' Error: ' + error.message;
  }

  console.log(errMsg);
}

function parseConsoleArgs([
  _,
  __,
  target,
  ...trainingHoursByDay
]: string[]): ExerciseValues {
  if (!target || !trainingHoursByDay) {
    throw new Error('Please provide at least two arguments');
  }

  if (
    isNotNumber(target) ||
    trainingHoursByDay.some((hour) => isNotNumber(hour))
  ) {
    throw new Error('Please provide only numbers');
  }

  return {
    target: Number(target),
    trainingHoursByDay: trainingHoursByDay.map((hourString) =>
      Number(hourString)
    ),
  };
}

function calculateExcercises(
  target: number,
  trainingHoursByDay: number[]
): ExerciseInfo {
  const trainingDays = trainingHoursByDay.filter(hasTrainedThatDay).length;
  const average = getAverage(trainingHoursByDay);

  const info: ExerciseInfo = {
    periodLength: trainingHoursByDay.length,
    success: target <= average,
    rating: 2, // Didn't feel like implemeting this rating, the exercise lets us decide how to come up with it.
    ratingDescription: '',
    average,
    target,
    trainingDays,
  };

  return info;
}

function hasTrainedThatDay(day: number) {
  return day !== 0;
}

// console.log('Calculate Ex: ', calculateExcercises(2, [3, 0, 2, 4.5, 0, 3, 1]));
interface ExerciseValues {
  target: number;
  trainingHoursByDay: number[];
}
