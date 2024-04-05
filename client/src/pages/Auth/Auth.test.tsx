import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Auth } from './Auth';

describe('Auth component', () => {
    const mockLogin = jest.fn();
    const mockRegistration = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(
            <Auth
                login={mockLogin}
                registration={mockRegistration}
            />
        );
    });

    it('disables submit button when username or password is empty', () => {
        const { getByText } = render(
            <Auth
                login={mockLogin}
                registration={mockRegistration}
            />
        );

        const submitButton = getByText('Log in');
        expect(submitButton).toBeDisabled();
    });
});
