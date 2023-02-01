import React from "react";
import { render, fireEvent } from '@testing-library/react';
import NavigationBar from "..";

describe('Pages/Create/Components/NavigationBar', () => {
    const onBackSpy = jest.fn();
    const onCreateSpy = jest.fn();

    it('should render correctly with Add button enabled', () => {
        const { asFragment, getByTestId } = render(<NavigationBar onBack={onBackSpy} onCreate={onCreateSpy} canCreate />);
        const addButton = getByTestId('add_button');
        expect(addButton).not.toBeDisabled();
        expect(asFragment()).toMatchSnapshot();
    })

    it('should render correctly with Add button disabled', () => {
        const { asFragment, getByTestId } = render(<NavigationBar onBack={onBackSpy} onCreate={onCreateSpy} canCreate={false} />);
        const addButton = getByTestId('add_button');
        expect(addButton).toBeDisabled();
        expect(asFragment()).toMatchSnapshot();
    })

    it('should trigger onBack function when click Back button', () => {
        const { getByTestId } = render(<NavigationBar onBack={onBackSpy} onCreate={onCreateSpy} canCreate />);
        const backButton = getByTestId('back_button');
        fireEvent.click(backButton)
        expect(onBackSpy).toHaveBeenCalledTimes(1);
    })

    it('should trigger onCreate function when click Add button', () => {
        const { getByTestId } = render(<NavigationBar onBack={onBackSpy} onCreate={onCreateSpy} canCreate />);
        const addButton = getByTestId('add_button');
        fireEvent.click(addButton)
        expect(onCreateSpy).toHaveBeenCalledTimes(1);
    })
})