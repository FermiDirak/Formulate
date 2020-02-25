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

  // it("will show an error if the input is invalid", () => {
  //   const onSubmit = jest.fn();

  //   const wrapper = mount(<ArrayForm onSubmit={onSubmit} />);
  //   const lastInput = wrapper.find(TextInput).last();

  //   act(() => {
  //     lastInput.props().onChange('Mayonnaise');
  //     lastInput.props().onBlur();
  //   });

  //   const errorBanner = wrapper.find(ErrorBanner);
  //   console.log(errorBanner.props().errors);


  //   const submitButton = wrapper.find('button').find({children: "submit"});
  //   submitButton.simulate("submit");

  //   expect(onSubmit).not.toBeCalled();
  // });
});