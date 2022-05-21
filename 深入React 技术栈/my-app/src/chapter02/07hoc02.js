// 高阶组件反向劫持
import React, { Component } from "react";

// 获取 state props
// function Hoc (WrappedComponent) {
//   return class extends WrappedComponent {
//     render() {
//       return (
//         <div>
//           <h1>hoc debug component</h1>
//           <p>props: <pre>{JSON.stringify(this.props, null, 2)}</pre></p>
//           <p>state: <pre>{JSON.stringify(this.state, null, 2)}</pre></p>
//           {super.render()}
//         </div>
//       )
//     }
//   }
// }

// class Index extends Component {
//   state = { 
//     name: 'zoe'
//   } 
//   render() { 
//     return (
//       <div>
//         <p>name: {this.state.name}</p>
//         <p>age: {this.props.age}</p>
//         <p>tip: {this.props.tip}</p>
//       </div>
//     );
//   }
// }

// 劫持渲染
function Hoc (WrappedComponent) {
  return class extends WrappedComponent {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`

    render() {
      const elementTree = super.render()
      console.log('elementTree', elementTree)
      let newProps = {}
      if (elementTree && elementTree.type === 'input') {
        newProps = {
          value: 'may the force be with you',
          onChange: () => {}
        }
      }
      const props = Object.assign({}, elementTree.props, newProps)
      console.log('props', props)
      const newElementTree = React.cloneElement(elementTree, props, elementTree.props.children)
      return newElementTree
    }
  }
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

class HOCTest extends Component {
  state = { 
  } 
  render() { 
    return (
      <input />
    );
  }
}

 
export default Hoc(HOCTest);