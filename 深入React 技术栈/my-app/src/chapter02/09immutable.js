import React,{ Component, PureComponent } from "react";
import _ from 'lodash';
import { is, fromJS } from 'immutable'


class Immutable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      list: [{name: 'a', age: 1}, {name: 'b', age: 2}, {name: 'c', age: 3}],
      // obj: {
      //   title: 'immutable'
      // }
      obj: fromJS({title: 'immutable'})
    }
  }
  
  
  add = () => {
    let list = _.cloneDeep(this.state.list)
    list.push({name: 'd' + Math.random(), age: Math.round((Math.random() * 10))})
    this.setState({list})
  }

  change = () => {
    let list = _.cloneDeep(this.state.list)
    list[2].age = Math.round((Math.random() * 10))
    this.setState({list})
  }

  changeName = () => {
    let {obj} = this.state
    obj = obj.set('title', 'immutable ' + Math.random())

    // 不使用 immutable ，pureComponent 不会rerender
    // const {obj} = this.state
    // obj.title = 'immutable ' + Math.random()
    
    this.setState({
      obj
    })
  }
  render() {
    console.log('render Immutable parent', this.state)
    return (
      <div>
        <div>hello {this.state.name}</div>
        <ul>
          {this.state.list.map(item => <li key={item.name}>name: {item.name}, age: {item.age}</li>)}
        </ul>
        <button onClick={this.add}>add to list</button>
        <button onClick={this.change}>change list item</button>
        <Child name={this.state.obj}/>
        <button onClick={this.changeName}>change name</button>
      </div>
    );
  }
}

// class Child extends Component {
//   shouldComponentUpdate(nextProps, nextState) {
//     const state = this.state || {}
//     const props = this.props || {}
//     console.log('nextProps', nextProps)
//     console.log('nextState', nextState)
//     const _nextProps = nextProps || {}
//     const _nextState = nextState || {}
//     if (Object.keys(state).length !== Object.keys(_nextState).length || Object.keys(props).length !== Object.keys(_nextProps).length) {
//       return true
//     }
//     for(const key in _nextState) {
//       if (_nextState.hasOwnProperty(key) && !is(state[key], nextProps[key])) {
//         return true
//       }
//     }
//     for(const key in _nextProps) {
//       if (_nextProps.hasOwnProperty(key) && !is(props[key], nextProps[key])) {
//         return true
//       }
//     }
//     return false
//   }
//   render() { 
//     console.log('render Immutable child')
//     const { name } = this.props
//     return (<div>{name}</div>);
//   }
// }

class Child extends PureComponent {
  render() { 
    console.log('render Immutable child')
    const name = this.props.name
    console.log(name)
    // return (<div>{name.title}</div>);
    return (<div>{name.get('title')}</div>);
  }
}

export default Immutable;

// import { Component, PureComponent } from 'react'
// import { fromJS } from 'immutable'

// export default class Parent extends Component {
//   state = {
//     title: '我是改变的内容',
//     user: fromJS({ name: '张三' })
//   }

//   handleChangeTitle() {
//     this.setState({ title: '我已经改变' })
//   }

//   handleChangeName() {
//     let { user } = this.state
//     user = user.set('name', '李四')
//     this.setState({ user })
//   }

//   render() {
//     return (
//       <>
//         <div onClick={this.handleChangeTitle.bind(this)}>{this.state.title}</div>
//         <div onClick={this.handleChangeName.bind(this)}>改变children的值</div>
//         <Child name={this.state.user} />
//       </>
//     )
//   }
// }

// class Child extends PureComponent {
//   render() {
//     console.log('child is render....', this.props)
//     const name = this.props.name
//     return (
//       <>
//         <div>我是子组件的名称：{name.get('name')}</div>
//       </>
//     )
//   }
// }
