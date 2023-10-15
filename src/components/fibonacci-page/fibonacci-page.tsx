import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../string/string";
import { fib } from "./utils";

type TFibElement = {
  letter: string;
  index: number;
};

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>();
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [btnLoader, setBtnLoader] = useState(false);
  const [fibSequence, setFibSequence] = useState<Array<TFibElement>>([]);

  const updateFibSequence = async (modifiedFibSequence: Array<TFibElement>) => {
    await delay(500);
    setFibSequence([...modifiedFibSequence]);
  };

  const getFibSeqyence = async (n: number) => {
    setBtnLoader(true);
    const nums = fib(n);
    const currentFibSequence: Array<TFibElement> = [];
    for (let i = 0; i < nums.length; i++) {
      currentFibSequence.push({ letter: nums[i].toString(), index: i });
      await updateFibSequence(currentFibSequence);
    }
    setBtnLoader(false);
  };

  const onClickHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue) {
      getFibSeqyence(inputValue);
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const current = +event.target.value;
    if (current && current > 19) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
      setInputValue(current);
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <form className={styles.input}>
          <Input
            max={19}
            isLimitText={true}
            type={"number"}
            onChange={onChangeHandler}
          />
          <Button
            text="Рассчитать"
            type="submit"
            disabled={btnDisabled || !inputValue}
            isLoader={btnLoader}
            onClick={onClickHandler}
          />
        </form>
        <div className={styles.animation}>
          {fibSequence.map((el, index) => {
            return <Circle index={el.index} letter={el.letter} key={index} />;
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
