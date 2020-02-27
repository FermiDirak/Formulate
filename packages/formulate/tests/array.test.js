import * as React from "react";
import ReactDOM from 'react-dom';
import { mount } from "enzyme";
import {act} from "react-dom/test-utils";

import ArrayForm from '../tests/ArrayForm';
import ErrorBanner from '../tests/ErrorBanner';
import InputError from '../tests/InputError';
import TextInput from './TextInput';

function fillAndBlur10Inputs(wrapper, onSubmit, text) {
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
      input.props().onChange(text);
      input.props().onBlur();
    });
  });

  wrapper.update();

}

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

    fillAndBlur10Inputs(wrapper, onSubmit, "Mayonnaise");

    const errors = wrapper.find(InputError).reduce((acc, inputError) => {
      acc.push(...inputError.props().errors);
      return acc;
    }, []);

    expect(errors.length).toBe(wrapper.find(TextInput).length);

    // error message labels should include indexes in order
    errors.forEach((error, i) => {
      const errorMessageLabel = error.split(' ')[0];

      expect(errorMessageLabel).toBe(`instruments[${i}]`);
    });
  });

  it("creates hashes that don't collide", () => {
    const wrapper = mount(<ArrayForm />);

    // add a lot of inputs
    const addButton = wrapper.find('button').find({children: 'add instrument'});

    act(() => {
      for (let i = 0; i < 10; ++i) {
        addButton.simulate('click');
      };
    });

    wrapper.update();

    const keys = new Set();

    const inputContainers = wrapper.find('.inputContainer');

    inputContainers.forEach(container => {
      keys.add(container.key())
    });

    expect(keys.size).toBe(inputContainers.length);
  });

  describe("item removal via .remove(i)", () => {
    it("removes an item when remove(i) is called", () => {
      const onSubmit = jest.fn();
      const wrapper = mount(<ArrayForm onSubmit={onSubmit} />);

      fillAndBlur10Inputs(wrapper, onSubmit, "Clarinet");

      const initialInputsCount = wrapper.find(TextInput).length;

      act(() => {
        wrapper.find('button').find({children: 'remove instrument 5'}).props().onClick();
      })

      wrapper.update();

      const endInputsCount = wrapper.find(TextInput).length;

      expect(initialInputsCount - 1).toBe(endInputsCount);
    });

    it("reflows form input labels", () => {
      const onSubmit = jest.fn();
      const wrapper = mount(<ArrayForm onSubmit={onSubmit} />);

      fillAndBlur10Inputs(wrapper, onSubmit, "Mayonnaise");

      act(() => {
        wrapper.find('button').find({children: 'remove instrument 5'}).props().onClick();
      });

      wrapper.update();

      const errors = wrapper.find(InputError).reduce((acc, inputError) => {
        acc.push(...inputError.props().errors);
        return acc;
      }, []);

      // error message labels should include indexes in order
      errors.forEach((error, i) => {
        const errorMessageLabel = error.split(' ')[0];

        expect(errorMessageLabel).toBe(`instruments[${i}]`);
      });
    });
  });
});
