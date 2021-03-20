import React from 'react';
import { createStore, combineReducers } from 'redux';

const App = () => {
  // Action Creators (people dropping off a form)
  const createPolicy = (name, amount) => {
    // Action (a form in our analogy)
    return {
      type: 'CREATE_POLICY',
      payload: {
        name: name,
        amount: amount,
      },
    };
  };

  const deletePolicy = (name) => {
    return {
      type: 'DELETE_POLICY',
      payload: {
        name: name,
      },
    };
  };

  const createClaim = (name, amountOfMoneyToCollect) => {
    return {
      type: 'CREATE_CLAIM',
      payload: {
        name: name,
        amountOfMoneyToCollect: amountOfMoneyToCollect,
      },
    };
  };

  // Reducers (departments!)
  const claimHistory = (oldListOfClaims = [], action) => {
    // we care about this action (form)
    if (action.type === 'CREATE_CLAIM') {
      return [...oldListOfClaims, action.payload];
    }

    // we don't care about this action (form)
    return oldListOfClaims;
  };

  const accounting = (bagOfMoney = 100, action) => {
    if (action.type === 'CREATE_CLAIM') {
      return bagOfMoney - action.payload.amountOfMoneyToCollect;
    } else if (action.type === 'CREATE_POLICY') {
      return bagOfMoney + action.payload.amount;
    }
    return bagOfMoney;
  };

  const policies = (listOfPolicies = [], action) => {
    if (action.type === 'CREATE_POLICY') {
      return [...listOfPolicies, action.payload.name];
    } else if (action.type === 'DELETE_POLICY') {
      return listOfPolicies.filter((name) => name !== action.payload.name);
    }
    return listOfPolicies;
  };

  const ourDepartments = combineReducers({
    accounting: accounting,
    claimHistory: claimHistory,
    policies: policies,
  });

  const store = createStore(ourDepartments);

  console.clear();
  console.log(store.getState());

  store.dispatch(createPolicy('Tom', 20));
  store.dispatch(createPolicy('Joe', 20));
  store.dispatch(createPolicy('Poe', 20));
  console.log(store.getState());

  store.dispatch(createClaim('Tom', 80));
  store.dispatch(createClaim('Joe', 80));
  console.log(store.getState());

  store.dispatch(deletePolicy('Poe'));
  console.log(store.getState());

  return (
    <div>
      <h1>Check Console</h1>
      <h4>minimum redux app</h4>
      <ul>
        <li>Action Creator | Person dropping off the form</li>
        <li>Action | the form</li>
        <li>dispatch | form receiver</li>
        <li>Reducers | Departments</li>
        <li>State | Compiled Department data</li>
      </ul>
    </div>
  );
};

export default App;
