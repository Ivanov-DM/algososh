import {ElementStates} from "../../types/element-states";
import {TListElement} from "./list-page";

export const getListElements = (array: number[]): Array<TListElement> => {
    return array.map((el, index, arr) => {
        return {
            letter: '' + el,
            index: index,
            head: index === 0 ? 'head' : '',
            tail: index === arr.length - 1 ? 'tail' : '',
            state: ElementStates.Default,
        }
    });
};

export const getFirstElement = (value: number) => {
    return {
        letter: '' + value,
        index: 0,
        head: 'head',
        tail: 'tail',
        state: ElementStates.Default,
    }
}