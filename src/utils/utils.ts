export const randomArr = (
  minVal: number,
  maxVal: number,
  minLen: number,
  maxLen: number
): Array<number> => {
  const arr: number[] = [];
  const length = getRandomNum(maxLen, minLen);
  for (let i = 0; i < length; i++) {
    arr.push(getRandomNum(maxVal, minVal));
  }
  return arr;
};

const getRandomNum = (max: number, min: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
