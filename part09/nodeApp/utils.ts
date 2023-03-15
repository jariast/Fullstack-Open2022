const isNotNumber = (argument: unknown): boolean => isNaN(Number(argument));

const getAverage = (numbersarr: number[]) => {
  const arrsum = numbersarr.reduce((sum, number) => sum + number, 0);
  return arrsum / numbersarr.length;
};

export { isNotNumber, getAverage };
