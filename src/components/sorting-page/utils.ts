import {swap} from "../../utils/utils";
import {ElementStates} from "../../types/element-states";
import {TSortingElement} from "./sorting-page";
import {Direction} from "../../types/direction";

type TSortingElementsStep = {
  elIndex1: number;
  elIndex2: number;
  currentState: number[];
  sortedElIndex: number[];
}

export const updateElementsState = (stepState: TSortingElementsStep): TSortingElement[] => {
  return stepState.currentState.map((el, idx) => {
    return {
      index: el,
      state: idx === stepState.elIndex1 || idx === stepState.elIndex2 ? ElementStates.Changing : stepState.sortedElIndex.includes(idx) ? ElementStates.Modified : ElementStates.Default
    }
  })
}

export const getElementsWithDefaultState = (arr: number[]): Array<TSortingElement> => {
  return arr.map((el) => {
    return { index: el as number, state: ElementStates.Default };
  });
};

export const getSelectionSortingSteps = (arr: number[], direction: Direction): TSortingElementsStep[] => {
  const result: TSortingElementsStep[] = [];
  const sortedIndex: number[] = [];
  const {length} = arr;
  if (arr.length === 0) {
    result.push({
      elIndex1: -1,
      elIndex2: -1,
      currentState: arr.slice(),
      sortedElIndex: sortedIndex.slice(),
    })
    return result
  }
  if (arr.length === 1) {
    sortedIndex.push(...arr)
    result.push({
      elIndex1: -1,
      elIndex2: -1,
      currentState: arr.slice(),
      sortedElIndex: sortedIndex.slice(),
    })
    return result
  }
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < length; j++) {
      result.push({
        elIndex1: maxInd,
        elIndex2: j,
        currentState: arr.slice(),
        sortedElIndex: sortedIndex.slice(),
      })
      if (direction === Direction.Descending) {
        if (arr[maxInd] < arr[j]) {
          maxInd = j;
        }
      } else {
        if (arr[maxInd] > arr[j]) {
          maxInd = j;
        }
      }
    }
    swap(arr, i, maxInd);
    if (i === length - 2) {
      sortedIndex.push(i);
      sortedIndex.push(i + 1);
      result.push({
        elIndex1: -1,
        elIndex2: -1,
        currentState: arr.slice(),
        sortedElIndex: sortedIndex.slice(),
      });
    } else {
      sortedIndex.push(i);
    }
  }
  return result;
}

export const getBubbleSortingSteps = (arr: number[], direction: Direction): TSortingElementsStep[] => {
  let isSorted;
  const result: TSortingElementsStep[] = [];
  const sortedIndex: number[] = [];
  const {length} = arr;
  if (arr.length === 0) {
    result.push({
      elIndex1: -1,
      elIndex2: -1,
      currentState: arr.slice(),
      sortedElIndex: sortedIndex.slice(),
    })
    return result
  }
  if (arr.length === 1) {
    sortedIndex.push(...arr)
    result.push({
      elIndex1: -1,
      elIndex2: -1,
      currentState: arr.slice(),
      sortedElIndex: sortedIndex.slice(),
    })
    return result
  }
  for (let i = 0; i < length; i++) {
    isSorted = true;
    for (let j = 0; j < length - i - 1; j++) {
      if (direction === Direction.Descending) {
        if (arr[j] < arr[j + 1]) {
          swap(arr, j, j + 1);
          isSorted = false;
        }
      } else {
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1);
          isSorted = false;
        }
      }
      result.push({
        elIndex1: j,
        elIndex2: j + 1,
        currentState: arr.slice(),
        sortedElIndex: sortedIndex.slice(),
      });
      if (j === length - i - 2) {
        if (isSorted) {
          for (let k = length - i - 1; k >= 0; k--) {
            sortedIndex.push(k);
          }
          result.push({
            elIndex1: -1,
            elIndex2: -1,
            currentState: arr.slice(),
            sortedElIndex: sortedIndex.slice(),
          });
          return result;
        } else {
          sortedIndex.push(j + 1);
        }
      }
      if (i === length - 2) {
        sortedIndex.push(j)
        result.push({
          elIndex1: -1,
          elIndex2: -1,
          currentState: arr.slice(),
          sortedElIndex: sortedIndex.slice(),
        });
      }
    }
  }
  return result;
};
