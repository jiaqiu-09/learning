import React, { Component } from "react";
import HOC from './03hoc.js'
class Index extends Component {
  state = { 
  } 

  testClick = () => {
    alert('===')
  }

  render() { 
    return (
      <div>
        <span ref={ref => this.nameDom = ref}>hello name</span>
        <button onClick={this.testClick}>click</button>
      </div>
    );
  }
}
 
export default HOC(Index);