import Button, { IButton } from '@/components/elements/buttons/Button';
import { render } from '@/tests/utils/test-utils';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';

describe('Sample Button', () => {
  // Initialise props
  let expectedProps: IButton;

  // Give props sample values
  beforeEach(() => {
    expectedProps = {
      title: 'sample',
      onClick: jest.fn(),
    };
  });

  // Run Tests
  it('is created and function called on click', () => {
    render(<Button {...expectedProps} />);
    const button = screen.getByText(expectedProps.title);

    expect(button).toBeVisible();
    fireEvent.click(button);
    expect(expectedProps.onClick).toBeCalledTimes(1);
  });
});
