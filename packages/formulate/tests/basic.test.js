import * as React from "react";
import { shallow } from "enzyme";

import Formulate from 'index';

describe("basic test", () => {
  it("works", () => {
    const wrapper = shallow(<Formulate />);

    expect(wrapper.text()).toBe('Hello world');
  });
});
