import React, { Component } from "react";

export default function hoc(WrappedComponent) {
  return class extends Component {

    componentDidMount() {
      console.log('hoc did mount')
    }

    componentWillUnmount() {
      console.log('hoc will unmount')
    }

    componentDidUpdate() {
      console.log('hoc did update')
    }

    proc(wrappedComp) {
      console.log('wrappedComp', wrappedComp)
      if (wrappedComp && wrappedComp.nameDom) {
        console.log(wrappedComp.nameDom)
        wrappedComp.nameDom.innerHTML = 'hello jack too'
      }
    }

    render () {
      const newProps = {
        name: 'jack'
      }
      const props = Object.assign({}, this.props, {
        ref: this.proc.bind(this)
      })
      return <WrappedComponent {...props} {...newProps} />
    }
  } 
}