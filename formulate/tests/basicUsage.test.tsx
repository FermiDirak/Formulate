import React from "react";
import {mount} from "enzyme";
import { BasicForm } from './BasicUsage';

describe("Basic Usage", () => {
  it("renders a basic form", () => {
    const wrapper = mount(<BasicForm onSubmit={() => {}} />);
    expect(wrapper.find(BasicForm)).toBeTruthy();
  });

  it("calls onClick with initial formData when no actions are made", () => {
    const onSubmit = jest.fn()
    const initialFormData = {
      name: '',
    };

    const wrapper = mount(<BasicForm onSubmit={onSubmit} />);
    wrapper.find("button").simulate('click');

    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onSubmit.mock.calls[0][0]).toMatchObject(initialFormData);
  });

  it("calls onClick with formData representing the state of the form", () => {
    const onSubmit = jest.fn();
    const expectedFormData = {
      name: 'formulate',
    };

    const wrapper = mount(<BasicForm onSubmit={onSubmit} />);
    wrapper.find("input").simulate('change', {target: {value: 'formulate'}});
    wrapper.find("button").simulate('click');

    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onSubmit.mock.calls[0][0]).toMatchObject(expectedFormData);
  });
});
