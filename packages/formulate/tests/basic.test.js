import * as React from "react";
import ReactDOM from 'react-dom';
import { mount } from "enzyme";
import {act} from "react-dom/test-utils";

import BasicForm from '../tests/BasicForm';
import ErrorBanner from '../tests/ErrorBanner';
import TextInput from './TextInput';

describe("basic form", () => {
  it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<BasicForm />, div);
  });

  it("submits the form on submit", () => {
    const onSubmit = jest.fn();

    const wrapper = mount(<BasicForm onSubmit={onSubmit} />);
    const input = wrapper.find(TextInput);
    const submitButton = wrapper.find('button');

    act(() => {
      input.props().onChange('Dirak');
    });

    submitButton.simulate('click');

    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        name: "Dirak",
      })
    );
  });

  it("creates a form error if the form is invalid on onSubmit", () => {
    const onSubmit = jest.fn();

    const wrapper = mount(<BasicForm onSubmit={onSubmit} />);
    const input = wrapper.find(TextInput);
    const submitButton = wrapper.find('button');

    submitButton.simulate('click');

    expect(wrapper.find(ErrorBanner).props().errors.length).toBe(1);
    expect(onSubmit).not.toBeCalled();
  });
});
