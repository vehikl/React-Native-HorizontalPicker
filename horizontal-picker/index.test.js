import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import HorizontalPicker from './index';

describe('horizontal-picker', () => {
  it('can render', () => {
    const { getByText } = render(<HorizontalPicker min={1} max={100} />);
    expect(getByText('1')).toBeDefined();
  });

  describe('how it renders ranges', () => {
    const { getByText } = render(<HorizontalPicker min={1} max={5} />);

    it.each([1, 2, 3, 4, 5])(
      'render number %i in range',
      (number) => {
        expect(getByText(number.toString())).toBeDefined();
      },
    );
  });

  it('displays the selected value', async () => {
    const { getByTestId, getByText } = render(<HorizontalPicker min={1} max={5} />);
    const number = getByText('3');

    fireEvent.press(number);
    const selectedNumber = getByTestId('number');
    expect(selectedNumber.props.children).toBe(3);
  });

  it('changes the selected value when another item is selected', async () => {
    const { getByTestId, getByText } = render(<HorizontalPicker min={1} max={5} />);
    const selectedNumber = getByTestId('number');

    fireEvent.press(getByText('3'));
    expect(selectedNumber.props.children).toBe(3);

    fireEvent.press(getByText('4'));
    expect(selectedNumber.props.children).toBe(4);
  });

  it('calls onChange with the correct value', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <HorizontalPicker
        min={1}
        max={5}
        onValueChange={onValueChange}
      />,
    );

    fireEvent.press(getByText('3'));
    expect(onValueChange).toHaveBeenCalledWith(3);
  });

  it('displays the initial value on render', () => {
    const initialValue = 2;
    const { getByTestId } = render(
      <HorizontalPicker
        min={1}
        max={5}
        initialValue={initialValue}
      />,
    );

    const selectedNumber = getByTestId('number');
    expect(selectedNumber.props.children).toBe(initialValue);
  });
});
