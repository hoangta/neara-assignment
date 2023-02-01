import React from "react";
import { render, act } from '@testing-library/react';
import ExpirationIndicator from '../ExpirationIndicator'
import { mockSVGElementAnimate } from "../../../../../utils/testUtils";

const circleAnimateSpy = mockSVGElementAnimate();

describe('Pages/Home/Components/MFA/ExpirationIndicator', () => {
    const testExp = new Date(2023, 2, 2)

    it('should render correctly', () => {
        const { asFragment } = render(<ExpirationIndicator exp={testExp} />);
        expect(asFragment()).toMatchSnapshot();
    })

    it('should render remaining seconds correctly', () => {
        const mockRemainingSeconds = 86400
        const { getByText } = render(<ExpirationIndicator exp={testExp} />);
        expect(circleAnimateSpy).toBeCalledWith([{ strokeDashoffset: 0 }, { strokeDashoffset: 2 * 14 * Math.PI }], {
            duration: mockRemainingSeconds * 1000
        });
        expect(getByText(mockRemainingSeconds.toFixed())).toBeInTheDocument();
        const secsToPass = 2;
        act(() => {
            jest.advanceTimersByTime(secsToPass * 1000);
        })
        expect(getByText((mockRemainingSeconds - secsToPass).toFixed())).toBeInTheDocument();
    })
})