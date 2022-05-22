import React, { Component } from "react"

// HOC with params
function HocFactory(...params) {
  console.log('params ', params)
  return function Hoc(WrapComponent) {
    return class extends Component {
      render () {
        return <WrapComponent {...this.props} />
      }
    }
  }
}

class HocParams extends Component {
  state = {  } 
  render() { 
    return (
      <div>
        <p>name: {this.props.name}</p>
        <p>age: {this.props.age}</p>
      </div>
    );
  }
}
 
export default HocFactory('age', 12)(HocParams);