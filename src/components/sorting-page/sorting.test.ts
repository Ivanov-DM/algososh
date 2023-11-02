import {getBubbleSortingSteps, getSelectionSortingSteps} from "./utils";
import {Direction} from "../../types/direction";

describe('Sorting algorithm', () => {
    describe('Selection', () => {
        it('Should correctly work with empty array', () => {
            const sortingStepsAsc = getSelectionSortingSteps([], Direction.Ascending);
            const sortingStepsDesc = getSelectionSortingSteps([], Direction.Descending);
            expect(sortingStepsAsc[sortingStepsAsc.length - 1].currentState).toEqual([]);
            expect(sortingStepsDesc[sortingStepsDesc.length - 1].currentState).toEqual([]);
        });

        it('Should correctly sort array of one element', () => {
            const sortingStepsAsc = getSelectionSortingSteps([1], Direction.Ascending);
            const sortingStepsDesc = getSelectionSortingSteps([1], Direction.Descending);
            expect(sortingStepsAsc[sortingStepsAsc.length - 1].currentState).toEqual([1]);
            expect(sortingStepsDesc[sortingStepsDesc.length - 1].currentState).toEqual([1]);
        });

        it('Should correctly sort array of multiple elements', () => {
            const arr = [1, 34, 6, 23, 87, 33, 2, 6, 5];
            const arrAsc = [1, 2, 5, 6, 6, 23, 33, 34, 87];
            const arrDesc = [87, 34, 33, 23, 6, 6, 5, 2, 1];
            const sortingStepsAsc = getSelectionSortingSteps(arr.slice(), Direction.Ascending);
            const sortingStepsDesc = getSelectionSortingSteps(arr.slice(), Direction.Descending);
            expect(sortingStepsAsc[sortingStepsAsc.length - 1].currentState).toEqual(arrAsc);
            expect(sortingStepsDesc[sortingStepsDesc.length - 1].currentState).toEqual(arrDesc);
        });
    });

    describe('Bubble', () => {
        it('Should correctly work with empty array', () => {
            const sortingStepsAsc = getBubbleSortingSteps([], Direction.Ascending);
            const sortingStepsDesc = getBubbleSortingSteps([], Direction.Descending);
            expect(sortingStepsAsc[sortingStepsAsc.length - 1].currentState).toEqual([]);
            expect(sortingStepsDesc[sortingStepsDesc.length - 1].currentState).toEqual([]);
        });

        it('Should correctly sort array of one element', () => {
            const sortingStepsAsc = getBubbleSortingSteps([1], Direction.Ascending);
            const sortingStepsDesc = getBubbleSortingSteps([1], Direction.Descending);
            expect(sortingStepsAsc[sortingStepsAsc.length - 1].currentState).toEqual([1]);
            expect(sortingStepsDesc[sortingStepsDesc.length - 1].currentState).toEqual([1]);
        });

        it('Should correctly sort array of multiple elements', () => {
            const arr = [1, 34, 6, 23, 87, 33, 2, 6, 5];
            const arrAsc = [1, 2, 5, 6, 6, 23, 33, 34, 87];
            const arrDesc = [87, 34, 33, 23, 6, 6, 5, 2, 1];
            const sortingStepsAsc = getBubbleSortingSteps(arr.slice(), Direction.Ascending);
            const sortingStepsDesc = getBubbleSortingSteps(arr.slice(), Direction.Descending);
            expect(sortingStepsAsc[sortingStepsAsc.length - 1].currentState).toEqual(arrAsc);
            expect(sortingStepsDesc[sortingStepsDesc.length - 1].currentState).toEqual(arrDesc);
        });
    });
});