import React from "react";

const deepCopy = obj => JSON.parse(JSON.stringify(obj))

export const withStateStack = Component => {
  class StateStack extends React.Component {
    constructor(props) {
      super(props);
      this.defaultState = null;
      this.stack = [];
      this.component = React.createRef();

      this.stateStackPush = this.stateStackPush.bind(this);
      this.stateStackPop = this.stateStackPop.bind(this);
      this.stateStackDump = this.stateStackDump.bind(this);
      this.stateStackReset = this.stateStackReset.bind(this);
      this.stateStackLength = this.stateStackLength.bind(this);
    }

    componentDidMount() {
      if (this.defaultState === null) {
        this.defaultState = deepCopy(this.component.current.state);
      }
    }

    stateStackPush() {
      this.stack.push(deepCopy(this.component.current.state));
    }

    stateStackPop() {
      if (this.stack.length === 0) {
        console.warn("Cannot pop from empty stack!");
      } else {
        this.component.current.setState(this.stack.pop());
      }
    }

    stateStackLength() {
      return this.stack.length;
    }

    stateStackReset() {
      console.log(this);
      this.stack = [];
      this.component.current.setState(this.defaultState);
    }

    stateStackDump() {
      return this.stack;
    }

    render() {
      const stackProps = {
        stateStackPop: this.stateStackPop,
        stateStackPush: this.stateStackPush,
        stateStackDump: this.stateStackDump,
        stateStackReset: this.stateStackReset,
        stateStackLength: this.stateStackLength
      };
      return <Component {...this.props} {...stackProps} ref={this.component} />;
    }
  }
  return StateStack;
};
