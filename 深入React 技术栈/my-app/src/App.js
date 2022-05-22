import React, { useEffect } from 'react';
import './App.css';
import ReactDomFun from './chapter01/01-react-dom-func.js'
import Test02 from './chapter02/01非受控组件.js'
import Test03 from './chapter02/02classnames.js'
import Test04 from './chapter02/03组件传值.js'
import Test05 from './chapter02/04hocprops.js'
import Test06 from './chapter02/05hocrefs.js'
import Test07 from './chapter02/06hocInput.js'
import Test08 from './chapter02/07hoc02.js'
import Test09 from './chapter02/08hocwithparam.js'
import Test10 from './chapter02/09immutable.js'

function App() {
  useEffect(() => {
    console.log('render App')
  })
  return (
    <div className="App">
      <ReactDomFun></ReactDomFun>
      <Test02></Test02>
      <Test03></Test03>
      <Test04></Test04>
      <Test05></Test05>
      <Test06></Test06>
      <Test07></Test07>
      <Test08 age={18}></Test08>
      <Test09></Test09>
      <Test10></Test10>
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
