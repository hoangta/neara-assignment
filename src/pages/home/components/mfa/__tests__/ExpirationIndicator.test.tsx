import React from "react";
import { render } from '@testing-library/react';
import ExpirationIndicator from '../ExpirationIndicator'
import { mockSVGElementAnimate } from "../../../../../utils/testUtils";

jest.useFakeTimers("modern");
jest.setSystemTime(new Date(2023, 2, 1));
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
        const countDownLabel = getByText(mockRemainingSeconds.toFixed());
        expect(countDownLabel).toBeInTheDocument();
    })
})