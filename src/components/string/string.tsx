import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../hooks/useForm";
import { delay } from "../../utils/utils";

type TStringElement = {
  state: ElementStates;
  letter: string;
};

export const StringComponent: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ stringInput: "" });
  const [letters, setLetters] = useState<Array<TStringElement>>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);

  useEffect(() => {
    /^[a-zA-Z\u0400-\u04FF]+$/.test(values.stringInput)
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [values.stringInput]);

  const reverseString = async (str: string) => {
    setBtnLoader(true);
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
    setBtnLoader(false);
    setValues({ stringInput: "" });
  };

  const updateLetters = async (modifiedLetters: Array<TStringElement>) => {
    await delay(500);
    setLetters([...modifiedLetters]);
  };

  const onClickHandler = () => {
    const str = values.stringInput.trim();
    if (str) {
      reverseString(str);
    }
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <form className={styles.input}>
          <Input
            maxLength={11}
            isLimitText={true}
            type="text"
            onChange={handleChange}
            name="stringInput"
            value={values.stringInput}
          />
          <Button
            text="Развернуть"
            type="submit"
            disabled={isDisabled}
            isLoader={btnLoader}
            onClick={onClickHandler}
          />
        </form>
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
