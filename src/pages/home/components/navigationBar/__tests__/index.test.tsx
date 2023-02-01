import React from "react";
import { render, fireEvent } from '@testing-library/react';
import NavigationBar from '..'

describe('Pages/Home/Components/NavigationBar', () => {
    const onEditSpy = jest.fn();
    const onCreateSpy = jest.fn();

    it('should render correctly', () => {
        const { asFragment } = render(<NavigationBar onEdit={onEditSpy} onCreate={onCreateSpy} />);
        expect(asFragment()).toMatchSnapshot();
    })

    it('should trigger onEdit when click Edit button', () => {
        const { getByTestId } = render(<NavigationBar onEdit={onEditSpy} onCreate={onCreateSpy} />);
        const editButton = getByTestId('edit_button');
        fireEvent.click(editButton);
        expect(onEditSpy).toHaveBeenCalledTimes(1);
    })

    it('should trigger onCreate when click Add button', () => {
        const { getByTestId } = render(<NavigationBar onEdit={onEditSpy} onCreate={onCreateSpy} />);
        const addButton = getByTestId('add_button');
        fireEvent.click(addButton);
        expect(onCreateSpy).toHaveBeenCalledTimes(1);
    })
})
