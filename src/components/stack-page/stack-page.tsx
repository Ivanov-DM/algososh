import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./Stack";
import { delay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../hooks/useForm";

type TStackElement = {
  letter: string;
  index: number;
  head: string;
  state: ElementStates;
};

type TClickedButton = "addBtn" | "deleteBtn" | "resetBtn";

export const StackPage: React.FC = () => {
  const {values, handleChange, setValues} = useForm({stackValue: ''});
  const [clickedBtn, setClickedBtn] = useState<TClickedButton | string>();
  const [stackElements, setStackElements] = useState<Array<TStackElement>>([]);
  const stack = useRef(new Stack<TStackElement>());

  const updateStack = async (modifiedStack: Array<TStackElement>) => {
    await delay(500);
    setStackElements([...modifiedStack]);
  };

  const addHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setClickedBtn((event.currentTarget as HTMLButtonElement).value);
    let stackEl = {
      letter: values.stackValue,
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
    setValues({stackValue: ''})
    await updateStack(stack.current.elements());
    setClickedBtn("");
  };

  const deleteHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setClickedBtn((event.currentTarget as HTMLButtonElement).value);
    stack.current.peak()!.state = ElementStates.Changing;
    await updateStack(stack.current.elements());

    stack.current.pop();
    if (stack.current.getSize() !== 0) {
      stack.current.peak()!.head = "top";
    }
    await updateStack(stack.current.elements());
    setClickedBtn("");
  };

  const clearHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setClickedBtn((event.currentTarget as HTMLButtonElement).value);
    stack.current = new Stack<TStackElement>();
    await updateStack(stack.current.elements());
    setClickedBtn("");
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <form className={styles.input}>
          <Input
            maxLength={4}
            isLimitText={true}
            type="text"
            name="stackValue"
            value={values.stackValue}
            onChange={handleChange}
          />
          <div className={styles.btnContainer}>
            <Button
              text="Добавить"
              type="submit"
              onClick={addHandler}
              extraClass={styles.addBtn}
              disabled={!values.stackValue.trim() || clickedBtn !== ""}
              isLoader={clickedBtn === "addBtn"}
              value="addBtn"
            />
            <Button
              text="Удалить"
              onClick={deleteHandler}
              extraClass={styles.deleteBtn}
              disabled={stack.current.getSize() === 0 || clickedBtn !== ""}
              isLoader={clickedBtn === "deleteBtn"}
              value="deleteBtn"
            />
            <Button
              text="Очистить"
              type="reset"
              onClick={clearHandler}
              disabled={stack.current.getSize() === 0 || clickedBtn !== ""}
              isLoader={clickedBtn === "resetBtn"}
              value="resetBtn"
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
