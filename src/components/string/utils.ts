export const swap = <T>(
  arr: T[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const getReversingSteps = (str: string): string[][] => {
  const result: string[][] = [];
  if (str === '') {
    result.push([]);
    return result
  } else {
    const letters = str.split('');
    if (letters.length === 1) {
      result.push(letters.slice());
      return result;
    } else {
      result.push(letters.slice());
      let start: number = 0;
      let end: number = letters.length - 1;
      while (start < end) {
        swap(letters, start, end);
        result.push(letters.slice());
        start++;
        end--;
      }
      return result;
    }
  }
}
