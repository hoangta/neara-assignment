import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { mockStore, mockSVGElementAnimate } from './utils/testUtils'

mockStore();
mockSVGElementAnimate();

describe('App', () => {
    it('should render correctly', () => {
        const { asFragment } = render(<App />)
        expect(asFragment()).toMatchSnapshot()
    })
})