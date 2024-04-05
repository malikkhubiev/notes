import React from 'react';
import { render } from '@testing-library/react';
import { Preloader } from './Preloader';

// Mock CSS modules
jest.mock('./Preloader.less', () => ({
  preloader: 'mocked-preloader-class',
  spinner: 'mocked-spinner-class'
}));

describe('Preloader component', () => {
  it('renders correctly', () => {
    const { container } = render(<Preloader />);
    expect(container.firstChild).toHaveClass('mocked-preloader-class');
    expect(container.firstChild.firstChild).toHaveClass('mocked-spinner-class');
  });

  it('renders spinner element', () => {
    const { getByTestId } = render(<Preloader />);
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});
