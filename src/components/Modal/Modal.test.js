/* eslint-disable no-undef */
import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from './index';

const departments = [
  {
    id: 1,
    name: 'Quality',
  },
  {
    id: 2,
    name: 'Management',
  },
  {
    id: 3,
    name: 'Sales',
  },
];

function setup() {
  return render(
    <Modal
      closeModal={() => { }}
      allDepartments={departments}
    />,
  );
}

describe('Modal', () => {
  it('Input element should return a string', () => {
    setup();

    const text = '2020-18-02';
    const input = screen.getByLabelText('Data de ocorrência');

    userEvent.type(input, text);
    expect(typeof input.value).toEqual('string');
  });
});
