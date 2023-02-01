import React from "react";
import { fireEvent, render } from '@testing-library/react'
import MFAList from '..'
import { mockMFAs, mockSVGElementAnimate } from "../../../../../utils/testUtils";

jest.useFakeTimers("modern");
jest.setSystemTime(new Date(2023, 2, 1));
mockSVGElementAnimate();

describe('Pages/Home/Components/MFAList', () => {
    const switchMFAsSpy = jest.fn();

    it('should render correctly', () => {
        const { asFragment } = render(<MFAList mfas={mockMFAs} isEditing switchMFAs={switchMFAsSpy} />);
        expect(asFragment()).toMatchSnapshot();
    })

    it('should trigger switchMFAs correctly', () => {
        const { getByTestId } = render(<MFAList mfas={mockMFAs} isEditing switchMFAs={switchMFAsSpy} />);
        fireEvent.click(getByTestId('moveup_button_0'));
        expect(switchMFAsSpy).toBeCalledWith(0, -1);
        fireEvent.click(getByTestId('movedown_button_0'));
        expect(switchMFAsSpy).toBeCalledWith(0, 1);
        fireEvent.click(getByTestId('moveup_button_1'));
        expect(switchMFAsSpy).toBeCalledWith(1, 0);
        fireEvent.click(getByTestId('movedown_button_1'));
        expect(switchMFAsSpy).toBeCalledWith(1, 2);
    })
})