import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { fib } from "./utils";
import { useForm } from "../../hooks/useForm";

type TFibElement = {
  letter: string;
  index: number;
};

export const FibonacciPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ fibValue: "" });
  const [isDisabled, setIsDisabled] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  const [fibSequence, setFibSequence] = useState<Array<TFibElement>>([]);

  useEffect(() => {
    const number = +values.fibValue;
    !number || number < 1 || number > 19 || number % 1 !== 0
      ? setIsDisabled(true)
      : setIsDisabled(false);
  }, [values.fibValue]);

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
    setValues({ fibValue: "" });
    setBtnLoader(false);
  };

  const onClickHandler = (event: React.FormEvent) => {
    event.preventDefault();
    getFibSeqyence(+values.fibValue);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <form className={styles.input}>
          <Input
            max={19}
            isLimitText={true}
            type="number"
            onChange={handleChange}
            name="fibValue"
            value={values.fibValue}
          />
          <Button
            text="Рассчитать"
            type="submit"
            disabled={isDisabled}
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
