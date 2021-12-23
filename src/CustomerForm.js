import React, { useState } from 'react';

export const CustomerForm = ({ firstName, lastName, onSubmit }) => {
  // const customer = {firstName};
  const [ customer, setCustomer ] = useState({ firstName, lastName });

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
      value={customer.lastName}
      onChange={handleChangeFirstName}
    />
    <input type="submit" value="Add" />
  </form>;
};
