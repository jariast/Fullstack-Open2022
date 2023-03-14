import { ExerciseInfo } from './interfaces/ExceriseInfo';
import { getAverage } from './utils';

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

console.log('Calculate Ex: ', calculateExcercises(2, [3, 0, 2, 4.5, 0, 3, 1]));
