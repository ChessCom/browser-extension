import React from 'react';

function shallowComp(A, B) {
  if (A === B) {
    // They are the same object
    return true;
  }

  if (typeof A !== 'object' || A === null ||
      typeof B !== 'object' || B === null) {
    // This is only meant for comparing objects
    // If they are not the function could have unintended behaviour
    return false;
  }
  
  // Check that keys are the same
  const keysA = Object.keys(A);
  const keysB = Object.keys(B);
  if (keysA.length !== keysB.length) {
    return false;
  }
  return keysA.every(key => {
    if (!B.hasOwnProperty(key)) {
      return false;
    }
    return A[key] === B[key];
  });
}

export default class BaseComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    if (this.constructor === BaseComponent) {
      throw new TypeError('BaseComponent is abstract');
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return (!shallowComp(this.props, nextProps) ||
            !shallowComp(this.state, nextState));
  }
}
