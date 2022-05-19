import React, { Component } from "react";
import emitter from "../emitter";

export default class Index extends Component {

  handleClick = (a) => {
    console.log('clicked')
    emitter.emit('childClick', a)
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <TestA ChildClick={(a) => this.handleClick(a)}></TestA>
      </div>
    )
  }

}

class TestA extends Component {
  render() {
    return (
      <div onClick={() => this.props.ChildClick('aa')}>
        <label>hello child</label>
      </div>
    )
  }
}