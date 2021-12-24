import React from 'react';
import {createContainer} from './domManipulators';
import {CustomerForm} from '../src/CustomerForm';
import ReactTestUtils from 'react-dom/test-utils';

describe('CustomerForm', () => {
  //#region fields
  let render, container;

  const form = id => container.querySelector(`form[id="${id}"]`);

  const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

  const field = name => form('customer').elements[name];
  //#endregion

  //#region beforeEach
  beforeEach(() => {
    ({render, container} = createContainer());
  });
  //#endregion

  //#region check inputs
  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };

  const itRendersAsATextBox = (fieldName) =>
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });
  //#endregion

  //#region it fields
  const itIncludesTheExistingValue = (fieldName) =>
    it('includes the existing value', () => {
      render(<CustomerForm { ...{[fieldName]: 'value'} } />);
      expect(field(fieldName).value).toEqual('value');
    });

  const itSubmitsNewValue = (fieldName, value) =>
    it('saves new value when submitted', async () => {
      let submitArg;
      render(
        <CustomerForm
          { ...{[fieldName]: 'initial value'} }
          onSubmit={customer => submitArg = customer}
        />);

      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value, name: fieldName }
      });

      await ReactTestUtils.Simulate.submit(form('customer'));

      expect(submitArg[fieldName]).toEqual(value);
    });

  const itSubmitsExistingValue = fieldName =>
    it('saves existing value when submitted', async () => {
      let submitArg;
      render(<CustomerForm
        { ...{[fieldName]: 'value'} }
        onSubmit={customer => submitArg = customer}
      />);
      ReactTestUtils.Simulate.submit(form('customer'));
      expect(submitArg[fieldName]).toEqual('value');
    });

  //#endregion

  it('renders a form', () => {
    render(<CustomerForm/>);

    expect(form('customer')).not.toBeNull();
  });

  it('renders a label for the first name field', () => {
    render(<CustomerForm firstName="Ashley"/>);
    expect(labelFor('firstName').textContent).toEqual('First name');
  });

  it('assigns an id that matches the label id to the first name field', () => {
    render(<CustomerForm/>);
    expect(field('firstName').id).toEqual('firstName');
  });

  it('has a submit button', () => {
    render(<CustomerForm />);
    const submitButton = container.querySelector(
      'input[type="submit"]'
    );
    expect(submitButton).not.toBeNull();
  });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    // itRendersALabel('firstName', 'First name');
    // itAssignsAnIdThatMatchesTheLabelId('firstName');
    itSubmitsNewValue('firstName', 'anotherFirstName');
    itSubmitsExistingValue('firstName');
  });

  describe('last name field', () => {
    itRendersAsATextBox('lastName');
    itIncludesTheExistingValue('lastName');
  });
});
