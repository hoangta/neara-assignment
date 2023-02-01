import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import { mockSVGElementAnimate } from '../utils/testUtils'

mockSVGElementAnimate();

describe('App', () => {
    it('should render correctly', () => {
        const { asFragment } = render(<App />);
        expect(asFragment()).toMatchSnapshot();
    })

    it('should show home page, then show create page after click on create button, and go back to home page', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('home_page')).toBeInTheDocument();

        fireEvent.click(getByTestId('add_button')); //Homepage's add button
        expect(getByTestId('create_page')).toBeInTheDocument();

        fireEvent.click(getByTestId('back_button')); //Create page's back button
        expect(getByTestId('home_page')).toBeInTheDocument();
    })
})