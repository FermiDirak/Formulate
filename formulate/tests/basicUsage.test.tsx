import React from "react";
import {mount} from "enzyme";
import useForm from '../src/index';

function BasicForm({onSubmit}: {onSubmit: (formData: any) => void}) {
  const formSchema = {
    name: { initial: '', placeholder: 'Alex' }
  }

  const [formInputs, formData] = useForm(formSchema);

  return (
    <form>
      <input type="text" {...formInputs.name} />
      <button type="button" onClick={() => onSubmit(formData)} />
    </form>
  )
}

describe("Basic Usage", () => {
  it("renders a basic form", () => {
    // let formData = null;
    // const onSubmit = (newFormData: any) => {
    //   formData = newFormData;
    // }

    const wrapper = mount(<BasicForm onSubmit={() => {}} />);

    // console.log(formData);

    console.log(wrapper.debug());

    console.log('yay');

  });
});