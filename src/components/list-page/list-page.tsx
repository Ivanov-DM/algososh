import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { LinkedList } from "./LInkedList";
import { randomArr } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { getFirstElement, getListElements } from "./utils";
import { useForm } from "../../hooks/useForm";

type TInsertedListElement = {
  letter: string;
  state: ElementStates;
  isSmall: boolean;
};

export type TListElement = {
  letter: string;
  index: number;
  head: string | TInsertedListElement;
  tail: string | TInsertedListElement;
  state: ElementStates;
};

type TClickedButton =
  | "addByHeadBtn"
  | "addByTailBtn"
  | "deleteByHeadBtn"
  | "deleteByTailBtn"
  | "addByIndexBtn"
  | "deleteByIndexBtn";

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({
    listValue: "",
    indexValue: "",
  });
  const [clickedBtn, setClickedBtn] = useState<TClickedButton | string>("");
  const [listElements, setListElements] = useState<Array<TListElement>>([]);
  const listRef = useRef(
    new LinkedList(randomArr(0, 50, 4, 6, "string") as string[])
  );
  const [isDisabledIndexBtn, setIsDisabledIndexBtn] = useState(false);

  useEffect(() => {
    setListElements([...getListElements(listRef.current.toArray())]);
  }, []);

  useEffect(() => {
    !values.indexValue ||
    +values.indexValue >= listRef.current.getSize() ||
    +values.indexValue < 0
      ? setIsDisabledIndexBtn(true)
      : setIsDisabledIndexBtn(false);
  }, [values.indexValue, values.listValue]);

  const updateList = async (modifiedStack: Array<TListElement>) => {
    await delay(1000);
    setListElements([...modifiedStack]);
  };

  const addByHeadHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!values.listValue) {
      return;
    }
    setClickedBtn((event.currentTarget as HTMLButtonElement).value);
    let modifiedElements = listElements.slice();
    if (listRef.current.getSize() === 0) {
      modifiedElements.push(getFirstElement(values.listValue));
      listRef.current.prepend(values.listValue);
      await updateList(modifiedElements);
      setClickedBtn("");
    } else {
      modifiedElements[0].head = {
        letter: values.listValue,
        state: ElementStates.Changing,
        isSmall: true,
      };
      await updateList(modifiedElements);
      listRef.current.prepend(values.listValue);
      modifiedElements = getListElements(listRef.current.toArray());
      modifiedElements[0].state = ElementStates.Modified;
      await updateList(modifiedElements);
      modifiedElements[0].state = ElementStates.Default;
      await updateList(modifiedElements);
      setValues({ listValue: "", indexValue: "" });
      setClickedBtn("");
    }
  };

  const addByTailHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!values.listValue) {
      return;
    }
    setClickedBtn((event.currentTarget as HTMLButtonElement).value);
    let modifiedElements = listElements.slice();
    if (listRef.current.getSize() === 0) {
      modifiedElements.push(getFirstElement(values.listValue));
      listRef.current.prepend(values.listValue);
      await updateList(modifiedElements);
      setClickedBtn("");
    } else {
      modifiedElements[modifiedElements.length - 1].tail = {
        letter: values.listValue,
        state: ElementStates.Changing,
        isSmall: true,
      };
      await updateList(modifiedElements);
      listRef.current.append(values.listValue);
      modifiedElements = getListElements(listRef.current.toArray());
      modifiedElements[modifiedElements.length - 1].state =
        ElementStates.Modified;
      await updateList(modifiedElements);
      modifiedElements[modifiedElements.length - 1].state =
        ElementStates.Default;
      await updateList(modifiedElements);
      setValues({ listValue: "", indexValue: "" });
      setClickedBtn("");
    }
  };

  const deleteByHeadHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setClickedBtn((event.currentTarget as HTMLButtonElement).value);
    let modifiedElements = listElements.slice();
    modifiedElements[0].head = {
      letter: modifiedElements[0].letter,
      state: ElementStates.Changing,
      isSmall: true,
    };
    modifiedElements[0].letter = "";
    await updateList(modifiedElements);
    listRef.current.deleteHead();
    await updateList(getListElements(listRef.current.toArray()));
    setClickedBtn("");
  };

  const deleteByTailHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setClickedBtn((event.currentTarget as HTMLButtonElement).value);
    let modifiedElements = listElements.slice();
    modifiedElements[modifiedElements.length - 1].tail = {
      letter: modifiedElements[modifiedElements.length - 1].letter,
      state: ElementStates.Changing,
      isSmall: true,
    };
    modifiedElements[modifiedElements.length - 1].letter = "";
    await updateList(modifiedElements);
    listRef.current.deleteTail();
    await updateList(getListElements(listRef.current.toArray()));
    setClickedBtn("");
  };

  const addByIndexHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setClickedBtn((event.currentTarget as HTMLButtonElement).value);
    if (!values.listValue || +values.indexValue >= listRef.current.getSize()) {
      return;
    }
    let modifiedElements = listElements.slice();
    // step #1: вместо head устанавливаем вставляемый элемент
    modifiedElements[0].head = {
      letter: values.listValue,
      state: ElementStates.Changing,
      isSmall: true,
    };
    await updateList(modifiedElements);
    // step #2: ищем нужный элемент по индексу по пути подсвечивая элементы, которые не подходят
    let findIndex = 0;
    while (findIndex !== +values.indexValue) {
      if (findIndex === 0) {
        modifiedElements[findIndex].head = "head";
      } else {
        modifiedElements[findIndex].head = "";
      }
      modifiedElements[findIndex].state = ElementStates.Changing;
      modifiedElements[findIndex + 1].head = {
        letter: values.listValue,
        state: ElementStates.Changing,
        isSmall: true,
      };
      findIndex++;
      await updateList(modifiedElements);
    }
    //step #3: вставляем елемент на нужный индекс и подсвечиваем его
    listRef.current.addByIndex(values.listValue, +values.indexValue);
    modifiedElements = getListElements(listRef.current.toArray());
    modifiedElements[+values.indexValue].state = ElementStates.Modified;
    await updateList(modifiedElements);
    //step #4: убираем подсветку вставленного по индексу элемента
    modifiedElements[+values.indexValue].state = ElementStates.Default;
    await updateList(modifiedElements);
    setClickedBtn("");
    setValues({ listValue: "", indexValue: "" });
  };

  const deleteByIndexHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setClickedBtn((event.currentTarget as HTMLButtonElement).value);
    if (+values.indexValue! >= listRef.current.getSize()) {
      return;
    }
    let modifiedElements = listElements.slice();
    // step #1: ищем нужный элемент по индексу по пути подсвечивая элементы, которые не подходят
    let findIndex = 0;
    while (findIndex !== +values.indexValue) {
      modifiedElements[findIndex].state = ElementStates.Changing;
      findIndex++;
      await updateList(modifiedElements);
    }
    //step #2: выносим значение удаляемого элемента в tail и подсвечиваем его
    modifiedElements[findIndex].tail = {
      letter: modifiedElements[findIndex].letter,
      state: ElementStates.Changing,
      isSmall: true,
    };
    modifiedElements[findIndex].letter = "";
    await updateList(modifiedElements);
    //step #3: удаляем елемент по индексу и отрисовываем новое состояние массива элементов
    listRef.current.deleteByIndex(+values.indexValue);
    await updateList(getListElements(listRef.current.toArray()));
    setClickedBtn("");
    setValues({ listValue: "", indexValue: "" });
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <Input
              maxLength={4}
              isLimitText={true}
              type="text"
              name="listValue"
              extraClass={styles.inputEl}
              onChange={handleChange}
              value={values.listValue}
            />
            <Button
              text="Добавить в head"
              type="submit"
              onClick={addByHeadHandler}
              linkedList={"small"}
              disabled={!values.listValue.trim() || clickedBtn !== ""}
              isLoader={clickedBtn === "addByHeadBtn"}
              value="addByHeadBtn"
            />
            <Button
              text="Добавить в tail"
              type="submit"
              linkedList={"small"}
              onClick={addByTailHandler}
              disabled={!values.listValue.trim() || clickedBtn !== ""}
              isLoader={clickedBtn === "addByTailBtn"}
              value="addByTailBtn"
            />
            <Button
              text="Удалить из head"
              linkedList={"small"}
              onClick={deleteByHeadHandler}
              disabled={listRef.current.getSize() === 0 || clickedBtn !== ""}
              isLoader={clickedBtn === "deleteByHeadBtn"}
              value="deleteByHeadBtn"
            />
            <Button
              text="Удалить из tail"
              linkedList={"small"}
              onClick={deleteByTailHandler}
              disabled={listRef.current.getSize() === 0 || clickedBtn !== ""}
              isLoader={clickedBtn === "deleteByTailBtn"}
              value="deleteByTailBtn"
            />
          </form>
          <form className={styles.form}>
            <Input
              placeholder="Введите индекс"
              type="number"
              name="indexValue"
              max={listRef.current.getSize() - 1}
              extraClass={styles.inputEl}
              onChange={handleChange}
              value={values.indexValue}
            />
            <Button
              text="Добавить по индексу"
              type="submit"
              linkedList={"big"}
              onClick={addByIndexHandler}
              disabled={
                isDisabledIndexBtn ||
                !values.listValue.trim() ||
                clickedBtn !== ""
              }
              isLoader={clickedBtn === "addByIndexBtn"}
              value="addByIndexBtn"
            />
            <Button
              text="Удалить по индексу"
              type="submit"
              linkedList={"big"}
              onClick={deleteByIndexHandler}
              disabled={isDisabledIndexBtn || clickedBtn !== ""}
              isLoader={clickedBtn === "deleteByIndexBtn"}
              value="deleteByIndexBtn"
            />
          </form>
        </div>
        <div className={styles.animation}>
          {listElements.length !== 0
            ? listElements.map((el, index, arr) => {
                return (
                  <Circle
                    letter={el.letter}
                    index={el.index}
                    head={
                      typeof el.head === "string" ? (
                        el.head
                      ) : (
                        <Circle
                          letter={el.head.letter}
                          state={el.head.state}
                          isSmall={el.head.isSmall}
                          key={index + arr.length}
                        />
                      )
                    }
                    tail={
                      typeof el.tail === "string" ? (
                        el.tail
                      ) : (
                        <Circle
                          letter={el.tail.letter}
                          state={el.tail.state}
                          isSmall={el.tail.isSmall}
                          key={index + arr.length}
                        />
                      )
                    }
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
