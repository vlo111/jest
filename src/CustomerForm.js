import React, { useState } from 'react';

export const CustomerForm = ({ firstName, onSubmit }) => {
  // const customer = {firstName};
  const [ customer, setCustomer ] = useState({ firstName });

  const handleChangeFirstName = ({ target }) => {
    setCustomer(customer => ({
      ...customer,
      [target.name]: target.value
    }));
  }

  return <form
    id="customer"
    onSubmit={() => onSubmit(customer)}
  >
    <label htmlFor="firstName">First name</label>
    <input
      type="text"
      name="firstName"
      id="firstName"
      value={customer.firstName}
      onChange={handleChangeFirstName}
    />
    <input
      type="text"
      name="lastName"
    />
    <input type="submit" value="Add" />
  </form>;
};
