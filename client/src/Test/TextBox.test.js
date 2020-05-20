import React from 'react';
import { mount } from 'enzyme';
import TextBox from '../components/TextBox';

test('textbox props value', () => {
  const wrapper = mount(
    <TextBox value="2" />
  );
  
  expect(wrapper.find('input').prop('value')).toBe('2');

  wrapper.setProps({value: "3"});
  expect(wrapper.find('input').prop('value')).toBe('3');

  wrapper.find('input').simulate('change', { target: { value: '111' } });
  expect(wrapper.find('input').prop('value')).toBe('111');

  wrapper.find('input').simulate('input', { target: { value: '222' } });
  expect(wrapper.find('input').prop('value')).toBe('222');
});
