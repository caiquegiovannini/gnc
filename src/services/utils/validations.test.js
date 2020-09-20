/* eslint-disable no-undef */
import { allFieldsValidate } from './validations';

const validObject = JSON.stringify({
  name: 'John Doe',
  age: 32,
  job: 'Developer',
});

const invalidObject = JSON.stringify({
  name: '',
  age: 25,
  job: 'Doctor',
});

describe('validation - should return an array with the fields it is not filled', () => {
  it('should return true', () => {
    expect(allFieldsValidate(validObject)).toEqual([]);
  });

  it('should return false', () => {
    expect(allFieldsValidate(invalidObject)).toEqual(['name']);
  });

  it('should return true', () => {
    expect(allFieldsValidate(invalidObject, 'name')).toEqual([]);
  });
});
