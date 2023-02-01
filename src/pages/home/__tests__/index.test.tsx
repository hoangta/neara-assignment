import React from "react";
import { fireEvent, render } from '@testing-library/react'
import Home from '..'
import MFAStore from "../../../stores/mfaStore";
import { mockSVGElementAnimate, mockMFAs } from '../../../utils/testUtils';

mockSVGElementAnimate();

describe('Pages/Home', () => {
    const mockStore = new MFAStore();
    const onCreateSpy = jest.fn();

    it('should render correctly', () => {
        const { asFragment } = render(<Home store={mockStore} onCreate={onCreateSpy} />);
        expect(asFragment()).toMatchSnapshot();
    })

    it('should handle events correctly', () => {
        const { queryByTestId, getByTestId } = render(<Home store={mockStore} onCreate={onCreateSpy} />);
        //Not editing
        expect(queryByTestId('moveup_button_0')).not.toBeInTheDocument();
        expect(queryByTestId('movedown_button_0')).not.toBeInTheDocument();
        //Editing
        fireEvent.click(getByTestId('edit_button'))
        expect(getByTestId('moveup_button_0')).toBeInTheDocument();
        expect(getByTestId('movedown_button_0')).toBeInTheDocument();
        //Create
        fireEvent.click(getByTestId('add_button'));
        expect(onCreateSpy).toBeCalledTimes(1);
        //Switch MFA
        fireEvent.click(getByTestId('moveup_button_0'));
        expect(mockStore.switchMFAs).toBeCalledWith(0, -1);
        fireEvent.click(getByTestId('movedown_button_0'));
        expect(mockStore.switchMFAs).toBeCalledWith(0, 1);
    })
})