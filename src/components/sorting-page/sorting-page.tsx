import React, {useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { SortingType } from "../../types/sorting-type";
import { swap } from "../string/utils";
import { delay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import {getRandomArrElements} from "./utils";

export type TSortingElement = {
  index: number;
  state: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = useState<SortingType | string>(
    SortingType.Selection
  );
  const [arr, setArr] = useState<Array<TSortingElement>>([]);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [btnLoader, setBtnLoader] = useState<Direction | string>();

  useEffect(() => {
    setArr(getRandomArrElements());
  }, [])

  const handleChangeRadioBtn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortingType(event.target.value);
  };

  const selectionSort = async (direction: Direction) => {
    setBtnDisabled(true);
    setBtnLoader(direction);
    const modifiedArr = arr.slice();
    const { length } = modifiedArr;
    const lastEl = length - 1;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      modifiedArr[maxInd].state = ElementStates.Changing;
      await updateSortingArr(modifiedArr);
      for (let j = i + 1; j < length; j++) {
        modifiedArr[j].state = ElementStates.Changing;
        await updateSortingArr(modifiedArr);
        if (direction === Direction.Ascending) {
          if (modifiedArr[maxInd].index > modifiedArr[j].index) {
            modifiedArr[maxInd].state = ElementStates.Default;
            maxInd = j;
            modifiedArr[maxInd].state = ElementStates.Changing;
            await updateSortingArr(modifiedArr);
          } else if (j < lastEl) {
            modifiedArr[j].state = ElementStates.Default;
            await updateSortingArr(modifiedArr);
          }
        } else {
          if (modifiedArr[maxInd].index < modifiedArr[j].index) {
            modifiedArr[maxInd].state = ElementStates.Default;
            maxInd = j;
            modifiedArr[maxInd].state = ElementStates.Changing;
            await updateSortingArr(modifiedArr);
          } else if (j < lastEl) {
            modifiedArr[j].state = ElementStates.Default;
            await updateSortingArr(modifiedArr);
          }
        }
      }
      swap(modifiedArr, i, maxInd);
      modifiedArr[i].state = ElementStates.Modified;
      modifiedArr[lastEl].state = ElementStates.Default;
      await updateSortingArr(modifiedArr);
    }
    modifiedArr[length - 1].state = ElementStates.Modified;
    await updateSortingArr(modifiedArr);
    setBtnDisabled(false);
    setBtnLoader("");
  };

  const bubbleSort = async (direction: Direction) => {
    setBtnDisabled(true);
    setBtnLoader(direction);
    const modifiedArr = arr.slice();
    let isSorted: boolean;
    const { length } = modifiedArr;
    for (let i = 0; i < length; i++) {
      isSorted = true;
      for (let j = 0; j < length - i - 1; j++) {
        if (j === 0) {
          modifiedArr[j].state = ElementStates.Changing;
          modifiedArr[j + 1].state = ElementStates.Changing;
        } else {
          modifiedArr[j - 1].state = ElementStates.Default;
          modifiedArr[j + 1].state = ElementStates.Changing;
        }
        if (direction === Direction.Ascending) {
          if (modifiedArr[j].index > modifiedArr[j + 1].index) {
            swap(modifiedArr, j, j + 1);
            await updateSortingArr(modifiedArr);
            isSorted = false;
          } else {
            await updateSortingArr(modifiedArr);
          }
        } else {
          if (modifiedArr[j].index < modifiedArr[j + 1].index) {
            swap(modifiedArr, j, j + 1);
            await updateSortingArr(modifiedArr);
            isSorted = false;
          } else {
            await updateSortingArr(modifiedArr);
          }
        }
        if (j + 1 === length - i - 1) {
          if (isSorted) {
            for (let k = 0; k < length - i; k++) {
              modifiedArr[k].state = ElementStates.Modified;
            }
            await updateSortingArr(modifiedArr);
            setBtnDisabled(false);
            setBtnLoader("");
            return;
          } else {
            modifiedArr[j + 1].state = ElementStates.Modified;
            modifiedArr[j].state = ElementStates.Default;
            await updateSortingArr(modifiedArr);
          }
        }
      }
    }
    setBtnDisabled(false);
    setBtnLoader("");
  };

  const handleAscSort = () => {
    if (sortingType === SortingType.Bubble) {
      bubbleSort(Direction.Ascending);
    } else {
      selectionSort(Direction.Ascending);
    }
  };

  const handleDescSort = () => {
    if (sortingType === SortingType.Bubble) {
      bubbleSort(Direction.Descending);
    } else {
      selectionSort(Direction.Descending);
    }
  };

  const updateSortingArr = async (modifiedArr: Array<TSortingElement>) => {
    await delay(500);
    setArr([...modifiedArr]);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <div className={styles.input}>
          <div className={styles.radioBtn}>
            <RadioInput
              label={"Выбор"}
              checked={sortingType === SortingType.Selection}
              onChange={handleChangeRadioBtn}
              value={SortingType.Selection}
              disabled={btnDisabled}
            />
            <RadioInput
              label={"Пузырёк"}
              checked={sortingType === SortingType.Bubble}
              onChange={handleChangeRadioBtn}
              value={SortingType.Bubble}
              disabled={btnDisabled}
            />
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.sortingBtns}>
              <Button
                sorting={Direction.Ascending}
                text={"По возрастанию"}
                onClick={handleAscSort}
                disabled={btnDisabled}
                isLoader={btnLoader === Direction.Ascending}
                extraClass={styles.sortingBtn}
              />
              <Button
                sorting={Direction.Descending}
                text={"По убыванию"}
                onClick={handleDescSort}
                disabled={btnDisabled}
                isLoader={btnLoader === Direction.Descending}
                extraClass={styles.sortingBtn}
              />
            </div>
            <Button
              text={"Новый массив"}
              onClick={() => {setArr(getRandomArrElements())}}
              disabled={btnDisabled}
            />
          </div>
        </div>
        <div className={styles.animation}>
          {arr.map((el, index) => {
            return <Column index={el.index} state={el.state} key={index} />;
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
