import React, { useEffect } from 'react';
import './App.css';
import ReactDomFun from './chapter01/01-react-dom-func.js'
import Test02 from './chapter02/01非受控组件.js'
import Test03 from './chapter02/02classnames.js'

function App() {
  useEffect(() => {
    console.log('render App')
  })
  return (
    <div className="App">
      <ReactDomFun></ReactDomFun>
      <Test02></Test02>
      <Test03></Test03>
    </div>
  );
}

// class App extends React.Component {
//   render () {
//     return (
//       <div className="App">
//       <ReactDomFun></ReactDomFun>
//     </div>
//     )
//   }
// }

export default App;
