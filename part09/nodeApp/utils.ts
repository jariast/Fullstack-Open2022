const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

const getAverage = (numbersarr: number[]) => {
  const arrsum = numbersarr.reduce((sum, number) => sum + number, 0);
  return arrsum / numbersarr.length;
};

export { isNotNumber, getAverage };
