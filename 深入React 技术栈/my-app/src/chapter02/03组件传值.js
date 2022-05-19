import React, { Component } from "react";

export default class Index extends Component {

  handleClick = (a) => {
    alert('ss' + a)
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