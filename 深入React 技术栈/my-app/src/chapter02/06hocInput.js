import React,{ Component } from "react";

function Hoc(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        name: ''
      }
      this.nameInputChange = this.nameInputChange.bind(this)
    }

    nameInputChange(e){
      console.log('ee', e)
      this.setState({
        name: e.target.value
      })
    }

    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.nameInputChange 
        }
      }
      return (
        <WrappedComponent {...this.props} {...newProps} />
      )
    }
  }
}


class Index extends Component {
  render() {
    return <input name="name" {...this.props.name} />
  }
}

export default Hoc(Index)