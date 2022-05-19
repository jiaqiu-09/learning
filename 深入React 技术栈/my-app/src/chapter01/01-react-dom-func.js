import React, {Component} from "react";
// import ReactDOM from 'react-dom';


export default class Index extends Component {

  componentDidMount() {
    // const dom = ReactDOM.findDOMNode(this);
    console.log('dom', this.dom)
  }

  render () {
    return (
      <div ref={(ref) => this.dom = ref}>react dom func test</div>
    )
  }
}