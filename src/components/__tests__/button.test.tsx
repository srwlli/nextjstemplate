// src/components/__tests__/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Button from '@/components/Button';

describe('Button Component', () => {
  it('renders a button with the provided text', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);
    const buttonElement = screen.getByText(/Test Button/i);

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies additional className when provided', () => {
    render(<Button className="custom-class">Styled Button</Button>);
    const buttonElement = screen.getByText(/Styled Button/i);
    expect(buttonElement).toHaveClass('custom-class');
  });
}); 