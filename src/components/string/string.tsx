import React, { useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

type TStringElement = {
  state: ElementStates;
  letter: string;
};

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [letters, setLetters] = useState<Array<TStringElement>>([]);

  const reverseString = async (str: string) => {
    const chars: string[] = str.split("");
    const initLetters: Array<TStringElement> = Array.from(
      chars.map((char) => {
        return { letter: char, state: ElementStates.Default };
      })
    );
    await updateLetters(initLetters);
    let start: number = 0;
    let end: number = chars.length - 1;

    while (start < end) {
      initLetters[start].state = ElementStates.Changing;
      initLetters[end].state = ElementStates.Changing;
      await updateLetters(initLetters);
      initLetters[start].state = ElementStates.Modified;
      initLetters[end].state = ElementStates.Modified;
      const temp = initLetters[start].letter;
      initLetters[start].letter = initLetters[end].letter;
      initLetters[end].letter = temp;
      await updateLetters(initLetters);
      start++;
      end--;
    }
    if (start === end) {
      initLetters[start].state = ElementStates.Modified;
      await updateLetters(initLetters);
    }
  };

  const updateLetters = async (modifiedLetters: Array<TStringElement>) => {
    await delay(500);
    setLetters([...modifiedLetters]);
  };

  const onClickHandler = () => {
    reverseString(inputValue);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            maxLength={11}
            isLimitText={true}
            type={"text"}
            onChange={onChangeHandler}
          />
          <Button text="Развернуть" onClick={onClickHandler} />
        </div>
        <div className={styles.animation}>
          {letters.map((letter, index) => {
            return (
              <Circle letter={letter.letter} state={letter.state} key={index} />
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
