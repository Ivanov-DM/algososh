import React, {useEffect, useRef, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {Queue} from "./Queue";
import {delay} from "../string/string";
import {getEmptyQueueElements} from "./utils";

type TQueueElement = {
  letter: string;
  index: number;
  head: string;
  tail: string;
  state: ElementStates;
}

type TClickedButton = 'addBtn' | 'deleteBtn' | 'resetBtn';

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [clickedBtn, setClickedBtn] = useState<TClickedButton | string>();
  const [queueElements, setQueueElements] = useState<Array<TQueueElement>>([]);
  const queue = useRef(new Queue<string>(7));

  useEffect(() => {
    const initQueueElements = getEmptyQueueElements(queue.current.getSize());
    setQueueElements([...initQueueElements]);
  }, [])

  const updateQueue = async (modifiedStack: Array<TQueueElement>) => {
    await delay(500);
    setQueueElements([...modifiedStack]);
  }

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    inputValue ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [inputValue]);

  const addElementHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setClickedBtn((event.currentTarget as HTMLButtonElement).value);
    queue.current.enqueue(inputValue);
    const modifiedQueue = queueElements.slice();
    queue.current.elements().forEach((el, idx) => {
      if (el) {
        if (queue.current.getHead() === idx) {
          modifiedQueue[idx].head = 'head';
        }
        if (queue.current.getTail() !== idx && modifiedQueue[idx].tail === 'tail') {
          modifiedQueue[idx].tail = '';
        }
        if (queue.current.getTail() === idx) {
          modifiedQueue[idx].tail = 'tail';
          modifiedQueue[idx].state = ElementStates.Changing;
        }
        modifiedQueue[idx].letter = el;
      }
    })
    await updateQueue(modifiedQueue);
    modifiedQueue[queue.current.getTail()].state = ElementStates.Default;
    await updateQueue(modifiedQueue);
    setInputValue('');
    setClickedBtn('');
  }

  const deleteElementHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setClickedBtn((event.currentTarget as HTMLButtonElement).value);
    const modifiedQueue = queueElements.slice();
    modifiedQueue[queue.current.getHead()].state = ElementStates.Changing
    await updateQueue(modifiedQueue);
    queue.current.dequeue();
    if (queue.current.isEmpty()) {
      modifiedQueue[queue.current.getHead()].state = ElementStates.Default;
    } else {
      modifiedQueue[queue.current.getHead() - 1].state = ElementStates.Default;
    }
    queue.current.elements().forEach((el, idx) => {
      if (el) {
        if (queue.current.getHead() === idx) {
          modifiedQueue[idx].head = 'head';
        }
        if (queue.current.getTail() !== idx && modifiedQueue[idx].tail === 'tail') {
          modifiedQueue[idx].tail = '';
        }
        if (queue.current.getHead() !== idx && modifiedQueue[idx].head === 'head') {
          modifiedQueue[idx].head = '';
        }
        if (queue.current.getTail() === idx) {
          modifiedQueue[idx].tail = 'tail';
        }
        modifiedQueue[idx].letter = el;
      } else {
        idx === 6
            ? modifiedQueue[idx] = {...modifiedQueue[idx], letter: '', head: 'head', tail: ''}
            : modifiedQueue[idx] = {...modifiedQueue[idx], letter: '', head: '', tail: ''}
      }
    });
    await updateQueue(modifiedQueue);
    setClickedBtn('');
  }

  const clearElementsHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setClickedBtn((event.currentTarget as HTMLButtonElement).value);
    queue.current.clear();
    if (queue.current.isEmpty()) {
      await updateQueue(getEmptyQueueElements(queue.current.getSize()));
    }
    setClickedBtn('');
  }


  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <form className={styles.input}>
          <Input
              maxLength={4}
              isLimitText={true}
              type={'text'}
              onChange={onChangeHandler}
              value={inputValue}
          />
          <div className={styles.btnContainer}>
            <Button
                text="Добавить"
                type="submit"
                onClick={addElementHandler}
                extraClass={styles.addBtn}
                disabled={btnDisabled || queue.current.getTail() === 6}
                isLoader={clickedBtn === "addBtn"}
                value="addBtn"
            />
            <Button
                text="Удалить"
                type="submit"
                onClick={deleteElementHandler}
                extraClass={styles.deleteBtn}
                disabled={queue.current.isEmpty() || clickedBtn !== ''}
                isLoader={clickedBtn === "deleteBtn"}
                value="deleteBtn"
            />
            <Button
                text="Очистить"
                type="reset"
                onClick={clearElementsHandler}
                disabled={(queue.current.isEmpty() && queue.current.getHead() !== 6) || clickedBtn !== ''}
                isLoader={clickedBtn === "resetBtn"}
                value="resetBtn"
            />
          </div>
        </form>
        <div className={styles.animation} >
          {queueElements.length !== 0
              ? queueElements.map((el, index) => {
                return (
                    <Circle
                        letter={el.letter}
                        index={el.index}
                        head={el.head}
                        tail={el.tail}
                        state={el.state}
                        key={index}
                    />
                )
              })
              : null}
        </div>
      </div>
    </SolutionLayout>
  );
};
