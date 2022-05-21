import React, { Component } from "react";
import HOC from './03hoc.js'

class Index extends Component {
  state = {  } 
  render() { 
    return (<h1>hello {this.props.name}</h1>);
  }
}

export default HOC(Index);