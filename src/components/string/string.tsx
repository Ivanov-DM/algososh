import React, {useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../hooks/useForm";
import { delay } from "../../utils/utils";
import {getReversingSteps} from "./utils";

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
    /\s+/.test(values.stringInput) || values.stringInput === ''
      ? setIsDisabled(true)
      : setIsDisabled(false);
  }, [values.stringInput]);

  const reverseString = async (str: string) => {
    setBtnLoader(true);
    const steps = getReversingSteps(str);
    const modifiedLetters = Array.from(
        steps[0].map((char) => {
          return {letter: char, state: ElementStates.Default};
        })
    );
    const {length} = modifiedLetters;
    for (let i = 0; i < steps.length; i++) {
      if (steps.length === 1) {
        modifiedLetters[i].state = ElementStates.Modified;
        await updateLetters(modifiedLetters);
      } else {
        if (modifiedLetters[i - 1]) {
          modifiedLetters[i - 1].letter = steps[i][i - 1];
          modifiedLetters[i - 1].state = ElementStates.Modified;
        }
        if (modifiedLetters[length - i]) {
          modifiedLetters[length - i].letter = steps[i][length - i];
          modifiedLetters[length - i].state = ElementStates.Modified;
        }
        if (i === steps.length - 1) {
          modifiedLetters[i].state = ElementStates.Modified;
        } else {
          modifiedLetters[i].state = ElementStates.Changing;
          modifiedLetters[length - i - 1].state = ElementStates.Changing;
        }
        await updateLetters(modifiedLetters);
      }
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
        <form data-testid='test-form' className={styles.input}>
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
              <Circle data-testid='circle-item' letter={letter.letter} state={letter.state} key={index} />
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
