import React from 'react';
import renderer from "react-test-renderer";

import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

describe('Test for circle component', () => {
    it('Circle renders correctly without letter', () => {
        const tree = renderer
            .create(<Circle/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle renders correctly with letters', () => {
        const tree = renderer
            .create(<Circle letter={'ABC'}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle renders correctly with attribute head as string', () => {
        const tree = renderer
            .create(<Circle letter={'ABC'} head={'1'}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle renders correctly with attribute head as react element', () => {
        const tree = renderer
            .create(<Circle letter={'ABC'} head={<Circle letter={'CAB'}/>}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle renders correctly with attribute tail as string', () => {
        const tree = renderer
            .create(<Circle letter={'ABC'} tail={'1'}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle renders correctly with attribute tail as react element', () => {
        const tree = renderer
            .create(<Circle letter={'ABC'} tail={<Circle letter={'CAB'}/>}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle renders correctly with attribute index', () => {
        const tree = renderer
            .create(<Circle letter={'ABC'} index={1}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle renders correctly with props isSmall === true', () => {
        const tree = renderer
            .create(<Circle letter={'ABC'} isSmall={true}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle renders correctly with attribute state === `ElementStates.Default`', () => {
        const tree = renderer
            .create(<Circle letter={'ABC'} state={ElementStates.Default}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle renders correctly with attribute state === `ElementStates.Changing`', () => {
        const tree = renderer
            .create(<Circle letter={'ABC'} state={ElementStates.Changing}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle renders correctly with attribute state === `ElementStates.Modified`', () => {
        const tree = renderer
            .create(<Circle letter={'ABC'} state={ElementStates.Modified}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});