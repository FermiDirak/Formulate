import * as React from "react";
import ReactDOM from 'react-dom';
import { mount } from "enzyme";
import {act} from "react-dom/test-utils";

import ArrayForm from '../tests/ArrayForm';
import ErrorBanner from '../tests/ErrorBanner';
import InputError from '../tests/InputError';
import TextInput from './TextInput';

describe("Array Form", () => {
  it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<ArrayForm />, div);
  });

  it("should render two inputs -- one for the prefill item and one for the next entry", () => {
    const wrapper = mount(<ArrayForm />);
    const inputs = wrapper.find(TextInput);

    expect(inputs.length).toBe(2);
  });

  it("will only submit with a value after that value's input has had onChange called", () => {
    const onSubmit = jest.fn();

    const wrapper = mount(<ArrayForm onSubmit={onSubmit} />);
    const submitButton = wrapper.find('button').find({children: "submit"});

    submitButton.simulate("submit");

    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        instruments: ['trombone'],
      })
    );
  });

  it("will show an error if the input is invalid", () => {
    const onSubmit = jest.fn();

    const wrapper = mount(<ArrayForm onSubmit={onSubmit} />);
    const lastInput = wrapper.find(TextInput).last();

    act(() => {
      lastInput.props().onChange('Mayonnaise');
      lastInput.props().onBlur();
    });

    wrapper.update();

    const errorBanner = wrapper.find(ErrorBanner);
    expect(wrapper.find(ErrorBanner).props().errors.length).toBe(0);

    const submitButton = wrapper.find('button').find({children: "submit"});
    submitButton.simulate("submit");

    expect(onSubmit).not.toBeCalled();
    expect(wrapper.find(ErrorBanner).props().errors.length).toBe(1);
  });

  it("will only submit touched inputs", () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<ArrayForm onSubmit={onSubmit} />);

    const lastInput = wrapper.find(TextInput).last();

    act(() => {
      lastInput.props().onChange('violin');
      lastInput.props().onBlur();
      // lastInput will be included even though it is empty since it was touched
      lastInput.props().onChange('');
      lastInput.props().onBlur();
    });

    wrapper.update();

    const submitButton = wrapper.find('button').find({children: "submit"});
    submitButton.simulate('submit');

    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        instruments: ['trombone', ''],
      })
    );

    // add a lot of inputs
    const addButton = wrapper.find('button').find({children: 'add instrument'});

    act(() => {
      for (let i = 0; i < 10; ++i) {
        addButton.simulate('click');
      };
    });

    wrapper.update();

    expect(wrapper.find(TextInput).length).toBe(12);

    // values of untouched inputs are still stripped
    submitButton.simulate('submit');
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        instruments: ['trombone', ''],
      })
    );
  });

  it("appends an index to an error label", () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<ArrayForm onSubmit={onSubmit} />);

        // add a lot of inputs
    const addButton = wrapper.find('button').find({children: 'add instrument'});

    act(() => {
      for (let i = 0; i < 10; ++i) {
        addButton.simulate('click');
      };
    });

    wrapper.update();

    const inputs = wrapper.find(TextInput);

    act(() => {
      inputs.forEach(input => {
        input.props().onChange("Mayonnaise");
        input.props().onBlur();
      });
    });

    wrapper.update();

    const errors = wrapper.find(InputError).reduce((acc, inputError) => {
      acc.push(...inputError.props().errors);
      return acc;
    }, []);

    expect(errors.length).toBe(inputs.length);
  });
});
