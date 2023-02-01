import React from "react";
import { render, fireEvent } from '@testing-library/react';
import Create from '..'
import MFAStore from "../../../stores/mfaStore";

describe('Pages/Create', () => {
    const onBackSpy = jest.fn();
    const mockStore = new MFAStore();

    it('should render correctly', () => {
        const { asFragment } = render(<Create store={mockStore} onBack={onBackSpy} />);
        expect(asFragment()).toMatchSnapshot();
    })

    it('should create MFA and trigger onBack when click on Add button', () => {
        const { getByTestId } = render(<Create store={mockStore} onBack={onBackSpy} />);
        const testName = 'Test Name';
        const nameTextInput = getByTestId('name_text_input');
        fireEvent.change(nameTextInput, { target: { value: testName } });

        const addButton = getByTestId('add_button');
        fireEvent.click(addButton);
        expect(mockStore.createMFA).toBeCalledWith(testName);
        expect(onBackSpy).toBeCalled();
    })

    it('should disable Add button if name input is empty', () => {
        const { getByTestId } = render(<Create store={mockStore} onBack={onBackSpy} />);
        const nameTextInput = getByTestId('name_text_input');
        fireEvent.change(nameTextInput, { target: { value: '' } });

        const addButton = getByTestId('add_button');
        expect(addButton).toBeDisabled();
    })
})