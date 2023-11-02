import React, {useEffect, useRef, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Direction} from "../../types/direction";
import {Column} from "../ui/column/column";
import {SortingType} from "../../types/sorting-type";
import {delay, getRandomArray} from "../../utils/utils";
import {ElementStates} from "../../types/element-states";
import {getBubbleSortingSteps, updateElementsState, getElementsWithDefaultState, getSelectionSortingSteps} from "./utils";

export type TSortingElement = {
  index: number;
  state: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = useState<SortingType | string>(
    SortingType.Selection
  );
  const [elements, setElements] = useState<Array<TSortingElement>>([]);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [btnLoader, setBtnLoader] = useState<Direction | string>();
  const numbersRef = useRef<number[]>(getRandomArray(0, 100, 3, 17, "number") as number[]);

  useEffect(() => {
    setElements(getElementsWithDefaultState(numbersRef.current));
  }, []);

  const updateSortingElementsWithDelay = async (modifiedElements: Array<TSortingElement>) => {
    await delay(500);
    setElements([...modifiedElements]);
  };

  const handleChangeRadioBtn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortingType(event.target.value);
  };

  const sortElements = async (direction: Direction) => {
    setBtnDisabled(true);
    setBtnLoader(direction);
    let sortingSteps;
    sortingType === SortingType.Bubble
        ? sortingSteps = getBubbleSortingSteps(numbersRef.current, direction)
        : sortingSteps = getSelectionSortingSteps(numbersRef.current, direction);
    for (let i = 0; i < sortingSteps.length; i++) {
      const modifiedElements = updateElementsState(sortingSteps[i]);
      await updateSortingElementsWithDelay(modifiedElements);
    }
    setBtnDisabled(false);
    setBtnLoader("");
  }

  const handleAscSort = () => {
      sortElements(Direction.Ascending);
  };

  const handleDescSort = () => {
    sortElements(Direction.Descending);
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
              onClick={() => {
                numbersRef.current = getRandomArray(0, 100, 3, 17, "number") as number[];
                setElements(getElementsWithDefaultState(numbersRef.current));
              }}
              disabled={btnDisabled}
            />
          </div>
        </div>
        <div className={styles.animation}>
          {elements.map((el, index) => {
            return <Column index={el.index} state={el.state} key={index} />;
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
