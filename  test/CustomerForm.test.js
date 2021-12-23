import React from 'react';
import {createContainer} from './domManipulators';
import {CustomerForm} from '../src/CustomerForm';
import ReactTestUtils from 'react-dom/test-utils';

describe('CustomerForm', () => {
  let render, container;

  const form = id => container.querySelector(`form[id="${id}"]`);

  const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

  const field = name => form('customer').elements[name];

  beforeEach(() => {
    ({render, container} = createContainer());
  });

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

  const itIncludesTheExistingValue = (fieldName) =>
    it('includes the existing value', () => {
      render(<CustomerForm { ...{[fieldName]: 'value'} } />);
      expect(field(fieldName).value).toEqual('value');
    });

  const itSubmitsNewValue = (fieldName, value) =>
  it('saves new value when submitted', async () => {
    expect.hasAssertions();
    render(
      <CustomerForm
        { ...{[fieldName]: 'existingValue'} }
        onSubmit={props =>
          expect(props[fieldName]).toEqual(value)
        }
      />);
    await ReactTestUtils.Simulate.change(field(fieldName), {
      target: { value, name: fieldName }
    });
    await ReactTestUtils.Simulate.submit(form('customer'));
  });

  it('renders a form', () => {
    render(<CustomerForm/>);

    expect(form('customer')).not.toBeNull();
  });

  it('includes the existing value for the first name', () => {
    render(<CustomerForm firstName="Ashley"/>);
    expect(field('firstName').value).toEqual('Ashley');
  });

  it('renders a label for the first name field', () => {
    render(<CustomerForm firstName="Ashley"/>);
    expect(labelFor('firstName').textContent).toEqual('First name');
  });

  it('assigns an id that matches the label id to the first name field', () => {
    render(<CustomerForm/>);
    expect(field('firstName').id).toEqual('firstName');
  });

  it('saves new first name when submitted', async () => {
    expect.hasAssertions();
    render(
      <CustomerForm
        firstName="Ashley"
        onSubmit={({ firstName }) =>
          expect(firstName).toEqual('Jamie')
        }
      />
    );

    await ReactTestUtils.Simulate.change(field('firstName'), {
      target: { value: 'Jamie', name: "firstName" }
    });

    await ReactTestUtils.Simulate.submit(form('customer'));
  });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    // itRendersALabel('firstName', 'First name');
    // itAssignsAnIdThatMatchesTheLabelId('firstName');
    // itSubmitsExistingValue('firstName', 'firstName');
    itSubmitsNewValue('firstName', 'anotherFirstName');
  });

  describe('last name field', () => {
    itRendersAsATextBox('lastName');
    itIncludesTheExistingValue('lastName');
  });

  it('has a submit button', () => {
    render(<CustomerForm />);
    const submitButton = container.querySelector(
      'input[type="submit"]'
    );
    expect(submitButton).not.toBeNull();
  });
});
