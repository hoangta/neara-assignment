import React from "react";
import { fireEvent, render } from '@testing-library/react'
import MFAView from '..'
import { mockSVGElementAnimate, mockMFAs } from "../../../../../utils/testUtils";

jest.useFakeTimers("modern");
jest.setSystemTime(new Date(2023, 2, 1));
mockSVGElementAnimate();

describe("Pages/Home/Components/MFAView", () => {
    const mockMFA = mockMFAs[0];
    const onMoveUpSpy = jest.fn();
    const onMoveDownSpy = jest.fn();

    it('should render correctly', () => {
        const { asFragment, getByText } = render(<MFAView mfa={mockMFA} isEditing onMoveUp={onMoveUpSpy} onMoveDown={onMoveDownSpy} />)
        expect(asFragment()).toMatchSnapshot();
        expect(getByText('012 345')).toBeInTheDocument();
    })

    it('should not render MoveBar if isEditing = false', () => {
        const { asFragment, queryByTestId } = render(<MFAView mfa={mockMFA} isEditing={false} onMoveUp={onMoveUpSpy} onMoveDown={onMoveDownSpy} />)
        expect(queryByTestId('moveup_button')).not.toBeInTheDocument();
        expect(queryByTestId('movedown_button')).not.toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot()
    })

    it('should trigger onMoveUp when click on move up button', () => {
        const { getByTestId } = render(<MFAView mfa={mockMFA} isEditing onMoveUp={onMoveUpSpy} onMoveDown={onMoveDownSpy} />)
        const moveUpButton = getByTestId('moveup_button_0');
        fireEvent.click(moveUpButton)
        expect(onMoveUpSpy).toBeCalledTimes(1);
    })

    it('should trigger onMoveDown when click on move down button', () => {
        const { getByTestId } = render(<MFAView mfa={mockMFA} isEditing onMoveUp={onMoveUpSpy} onMoveDown={onMoveDownSpy} />)
        const moveDownButton = getByTestId('movedown_button_0');
        fireEvent.click(moveDownButton)
        expect(onMoveDownSpy).toBeCalledTimes(1);
    })

    it('should render remaining seconds correctly', () => {
        const mockRemainingSeconds = 86400
        const { getByText } = render(<MFAView mfa={mockMFA} isEditing onMoveUp={onMoveUpSpy} onMoveDown={onMoveDownSpy} />)
        expect(getByText(mockRemainingSeconds.toFixed())).toBeInTheDocument();
    })
})