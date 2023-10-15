import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./Stack";
import { delay } from "../string/string";
import { ElementStates } from "../../types/element-states";

type TStackElement = {
  letter: string;
  index: number;
  head: string;
  state: ElementStates;
};

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [stackElements, setStackElements] = useState<Array<TStackElement>>([]);
  const stack = useRef(new Stack<TStackElement>());

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    inputValue ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [inputValue]);

  useEffect(() => {
    stack.current.getSize() !== 0 ? setIsEmpty(false) : setIsEmpty(true);
  }, [stack.current.getSize()]);

  const updateStack = async (modifiedStack: Array<TStackElement>) => {
    await delay(500);
    setStackElements([...modifiedStack]);
  };

  const addHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setInputValue("");
    let stackEl = {
      letter: inputValue,
      index: stack.current.getSize() === 0 ? 0 : stack.current.getSize(),
      head: "top",
      state: ElementStates.Changing,
    };
    if (stack.current.getSize() !== 0) {
      stack.current.peak()!.head = "";
    }
    stack.current.push(stackEl);
    await updateStack(stack.current.elements());
    stack.current.peak()!.state = ElementStates.Default;
    await updateStack(stack.current.elements());
  };

  const deleteHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    stack.current.peak()!.state = ElementStates.Changing;
    await updateStack(stack.current.elements());

    stack.current.pop();
    if (stack.current.getSize() !== 0) {
      stack.current.peak()!.head = "top";
    }
    await updateStack(stack.current.elements());
  };

  const clearHandler = (event: React.FormEvent) => {
    event.preventDefault();
    stack.current = new Stack<TStackElement>();
    setStackElements(stack.current.elements());
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <form className={styles.input}>
          <Input
            maxLength={4}
            isLimitText={true}
            type={"text"}
            onChange={onChangeHandler}
            value={inputValue}
          />
          <div className={styles.btnContainer}>
            <Button
              text="Добавить"
              type="submit"
              onClick={addHandler}
              extraClass={styles.addBtn}
              disabled={btnDisabled}
            />
            <Button
              text="Удалить"
              onClick={deleteHandler}
              extraClass={styles.deleteBtn}
              disabled={isEmpty}
            />
            <Button
              text="Очистить"
              type="reset"
              onClick={clearHandler}
              disabled={isEmpty}
            />
          </div>
        </form>
        <div className={styles.animation}>
          {stackElements.length !== 0
            ? stackElements.map((el, index) => {
                return (
                  <Circle
                    letter={el.letter}
                    index={el.index}
                    head={el.head}
                    state={el.state}
                    key={index}
                  />
                );
              })
            : null}
        </div>
      </div>
    </SolutionLayout>
  );
};
