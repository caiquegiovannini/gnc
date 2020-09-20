/* eslint-disable no-undef */
import React from 'react';
import {
  fireEvent, render, waitForElement,
} from '@testing-library/react';

import Input from './index';

describe('Input test', () => {
  it('Should return a string', async () => {
    let inputValue = '';
    const { getByTestId } = render(
      <Input
        id="testid"
        value={inputValue}
        onChange={(event) => {
          inputValue = event.target.value;
        }}
      />,
    );
    const fieldNode = await waitForElement(
      () => getByTestId('input'),
    );

    fireEvent.change(
      fieldNode,
      { target: { value: 'input test' } },
    );

    expect(typeof fieldNode.value).toBe('string');
  });
});
