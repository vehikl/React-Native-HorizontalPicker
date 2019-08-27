import React from 'react';
import { render } from 'react-native-testing-library';
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

});
