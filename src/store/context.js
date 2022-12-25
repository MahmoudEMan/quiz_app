import React from "react";

const Context = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  createUser: () => {},
});

export default Context;
