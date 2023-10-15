import {ElementStates} from "../../types/element-states";

export const getEmptyQueueElements = (queueSize: number) => {
    const queueElements = [];
    for (let i = 0; i < queueSize; i++) {
        queueElements.push({
            letter: '',
            index: i,
            head: '',
            tail: '',
            state: ElementStates.Default
        })
    }
    return queueElements
}