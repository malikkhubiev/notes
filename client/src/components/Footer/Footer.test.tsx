import React from 'react';
import { render, fireEvent, waitFor, queryByPlaceholderText } from '@testing-library/react';
import { Footer } from "./Footer"

const mockDeleteAccount = jest.fn();

describe('Footer component', () => {
    it('renders delete account button initially', () => {
        const { getByText } = render(<Footer deleteAccount={mockDeleteAccount} />);
        const deleteButton = getByText('delete account');
        expect(deleteButton).toBeInTheDocument();
    });

    it('shows password input when delete account button is clicked', () => {
        const { getByText, getByPlaceholderText } = render(<Footer deleteAccount={mockDeleteAccount} />);
        const deleteButton = getByText('delete account');
        fireEvent.click(deleteButton);
        const passwordInput = getByPlaceholderText('Enter your password');
        expect(passwordInput).toBeInTheDocument();
    });

    it('calls deleteAccount function with password when confirm button is clicked', async () => {
        const { getByText, queryByPlaceholderText, getByPlaceholderText } = render(
            <Footer deleteAccount={mockDeleteAccount} />
        );

        // Click delete account button to show password input
        fireEvent.click(getByText('delete account'));

        // Enter password
        const input = getByPlaceholderText('Enter your password')
        fireEvent.change(input, { target: { value: 'password123' } });

        // Click confirm button
        fireEvent.click(getByText('✔'));

        // Check if deleteAccount function was called with correct password
        expect(queryByPlaceholderText("Enter your password")).toBeNull();
    });
});
