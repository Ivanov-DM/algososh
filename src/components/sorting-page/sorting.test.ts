import {getBubbleSortingSteps, getSelectionSortingSteps} from "./utils";
import {Direction} from "../../types/direction";

describe('Sorting algorithm', () => {
    const ARR = [1, 34, 6, 23, 87, 33, 2, 6, 5];
    const ORDERED_ARR_BY_ASC = [1, 2, 5, 6, 6, 23, 33, 34, 87];
    const ORDERED_ARR_BY_DESC = [87, 34, 33, 23, 6, 6, 5, 2, 1];

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
            const sortingStepsAsc = getSelectionSortingSteps(ARR.slice(), Direction.Ascending);
            const sortingStepsDesc = getSelectionSortingSteps(ARR.slice(), Direction.Descending);
            expect(sortingStepsAsc[sortingStepsAsc.length - 1].currentState).toEqual(ORDERED_ARR_BY_ASC);
            expect(sortingStepsDesc[sortingStepsDesc.length - 1].currentState).toEqual(ORDERED_ARR_BY_DESC);
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
            const sortingStepsAsc = getBubbleSortingSteps(ARR.slice(), Direction.Ascending);
            const sortingStepsDesc = getBubbleSortingSteps(ARR.slice(), Direction.Descending);
            expect(sortingStepsAsc[sortingStepsAsc.length - 1].currentState).toEqual(ORDERED_ARR_BY_ASC);
            expect(sortingStepsDesc[sortingStepsDesc.length - 1].currentState).toEqual(ORDERED_ARR_BY_DESC);
        });
    });
});