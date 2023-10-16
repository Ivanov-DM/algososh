import {randomArr} from "../../utils/utils";
import {ElementStates} from "../../types/element-states";
import {TSortingElement} from "./sorting-page";

export const getRandomArrElements = (): Array<TSortingElement> => {
    const arr = randomArr(0, 100, 3, 17, 'number');
    return arr.map((el) => {
        return { index: el as number, state: ElementStates.Default };
    });
}