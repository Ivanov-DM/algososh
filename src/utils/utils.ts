export const randomArr = (
  minVal: number,
  maxVal: number,
  minLen: number,
  maxLen: number,
  typeElement: string | number
): Array<typeof typeElement> => {
  const arr = [];
  const length = getRandomNum(maxLen, minLen, "number");
  for (let i = 0; i < length; i++) {
    arr.push(getRandomNum(maxVal, minVal, typeElement));
  }
  return arr;
};

const getRandomNum = (
  max: number,
  min: number,
  typeElement: string | number
): string | number => {
  const element = Math.floor(Math.random() * (max - min + 1) + min);
  return typeElement === "number" ? element : "" + element;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
