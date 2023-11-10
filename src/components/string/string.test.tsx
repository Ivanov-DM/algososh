import {getReversingSteps} from "./utils";

describe('String', () => {
    it('Should be reversed correctly with an even number of characters', () => {
        const lettersWithSteps = getReversingSteps('1234');
        const reversedString = lettersWithSteps[lettersWithSteps.length - 1].join('');
        expect(reversedString).toEqual('4321');
    });

    it('Should be reversed correctly with an odd number of characters', () => {
        const lettersWithSteps = getReversingSteps('12345');
        const reversedString = lettersWithSteps[lettersWithSteps.length - 1].join('');
        expect(reversedString).toEqual('54321');
    });

    it('Should be reversed correctly with one character', () => {
        const lettersWithSteps = getReversingSteps('1');
        const reversedString = lettersWithSteps[lettersWithSteps.length - 1].join('');
        expect(reversedString).toEqual('1');
    });

    it('Should be reversed correctly without characters', () => {
        const lettersWithSteps = getReversingSteps('');
        const reversedString = lettersWithSteps[lettersWithSteps.length - 1].join('');
        expect(reversedString).toEqual('');
    });
})