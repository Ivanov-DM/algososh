import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react';

import { Button } from './button';

function handleClick() {
    alert('Button was pressed')
}

describe('Tests for button component', () => {
    it('Button renders correctly with attribute text', () => {
        const tree = renderer
            .create(<Button text="Тест"/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Button renders correctly without attribute text', () => {
        const tree = renderer
            .create(<Button/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Button renders correctly with attribute disabled', () => {
        const tree = renderer
            .create(<Button text="" disabled={true}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Button renders correctly with attribute isLoader', () => {
        const tree = renderer
            .create(<Button text="" isLoader={true}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Callback is called correctly when the button is pressed', () => {
        window.alert = jest.fn();
        render(<Button text="Test" onClick={handleClick}/>)
        const button = screen.getByText('Test');
        fireEvent.click(button);
        expect(window.alert).toHaveBeenCalledWith('Button was pressed');
    });
})