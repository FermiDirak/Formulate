import * as React from "react";
import ReactDOM from 'react-dom';
import { mount } from "enzyme";
import {act} from "react-dom/test-utils";

import BasicForm from '../tests/BasicForm';
import ErrorBanner from '../tests/ErrorBanner';
import InputError from '../tests/InputError';
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

  describe("error propagation", () => {
    it("creates a form error if the form is invalid on onSubmit", () => {
      const onSubmit = jest.fn();

      const wrapper = mount(<BasicForm onSubmit={onSubmit} />);
      const input = wrapper.find(TextInput);
      const submitButton = wrapper.find('button');

      submitButton.simulate('click');

      const inputError = wrapper.find(InputError);
      expect(inputError.props().errors.length).toBe(1);

      const errorBanner = wrapper.find(ErrorBanner);
      expect(errorBanner.props().errors.length).toBe(1);
    });

    it("does not show errors when there are none", () => {
      const wrapper = mount(<BasicForm />);
      const input = wrapper.find(TextInput);

      act(() => {
        input.props().onChange('Dirak');
      });

      wrapper.update();

      const inputError = wrapper.find(InputError);
      expect(inputError.props().errors.length).toBe(0);

      const errorBanner = wrapper.find(ErrorBanner);
      expect(errorBanner.props().errors.length).toBe(0);
    });

    it("does not perform error validation on field onChange", () => {
      const wrapper = mount(<BasicForm />);
      const input = wrapper.find(TextInput);

      act(() => {
        input.props().onChange('Dirak');
        input.props().onChange('');
      });

      wrapper.update();

      const inputError = wrapper.find(InputError);
      expect(inputError.props().errors.length).toBe(0);

      const errorBanner = wrapper.find(ErrorBanner);
      expect(errorBanner.props().errors.length).toBe(0);
    });

    it("performs error validation on field onBlur", () => {
      const wrapper = mount(<BasicForm />);
      const input = wrapper.find(TextInput);

      act(() => {
        input.props().onChange('');
        input.props().onBlur();
      });

      wrapper.update();

      const inputError = wrapper.find(InputError);
      expect(inputError.props().errors.length).toBe(1);

      const errorBanner = wrapper.find(ErrorBanner);
      expect(errorBanner.props().errors.length).toBe(0);
    });

    it("(validator) infers input label as parent object key", () => {
      const wrapper = mount(<BasicForm />);
      const input = wrapper.find(TextInput);

      act(() => {
        input.props().onChange('');
        input.props().onBlur();
      });

      wrapper.update();


      const inputError = wrapper.find(InputError);
      expect(inputError.props().errors.length).toBe(1);
      expect(inputError.props().errors[0]).toMatch(/name/);
    });
  });
});
