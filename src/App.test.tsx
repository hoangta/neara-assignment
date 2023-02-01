import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { mockSVGElementAnimate } from './utils/testUtils'

jest.useFakeTimers("modern");
jest.setSystemTime(new Date(2023, 2, 1));

jest.mock('./stores/mfaStore', () =>
    jest.fn().mockImplementation(() => ({
        mfas: [
            {
                provider: "Test Provider",
                code: "012345",
                image: "www.testurl.com",
                exp: new Date(2023, 2, 2),
            },
            {
                provider: "Test Provider 2",
                code: "543210",
                image: "www.testurl.com",
                exp: new Date(2023, 2, 3),
            },
        ],
        start: jest.fn()
    }))
);

mockSVGElementAnimate();

describe('App', () => {
    it('should render correctly', () => {
        const { asFragment } = render(<App />)
        expect(asFragment()).toMatchSnapshot()
    })
})