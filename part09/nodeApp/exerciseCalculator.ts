import { ExerciseInfo } from './interfaces/ExceriseInfo';

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

function getAverage(numbersArr: number[]): number {
  const arrSum = numbersArr.reduce((sum, number) => sum + number, 0);
  return arrSum / numbersArr.length;
}

console.log('Calculate Ex: ', calculateExcercises(2, [3, 0, 2, 4.5, 0, 3, 1]));
