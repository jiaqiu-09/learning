import React, { Component } from 'react';

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'axx'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    // 这里使用 React 提供的 ref prop 来操作 DOM
    // 当然，也可以使用原生的接口，如 document.querySelector
    const { value } = this.name;
    console.log(value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref={ref => this.name = ref} type="text" defaultValue="Hangzhou" />
        <button style={{height: 20}} type="submit">Submit</button>
        <input
          // value={this.state.value}
          defaultValue={this.state.value}
          onChange={e => {
            this.setState({ value: e.target.value.toUpperCase() })
          }} />
      </form>
    );
    }
}