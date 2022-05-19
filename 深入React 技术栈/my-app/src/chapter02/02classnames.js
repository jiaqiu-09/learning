import React, {Component} from "react";
import classNames from 'classnames'
import styles from './test02.module.css'

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showBlue: true,
      bigFont: true
    }
  }

  changeBlue = () => {
    this.setState({
      showBlue: !this.state.showBlue
    })
  }

  render() {

    const btnClass = classNames({
      [styles['big-font']]: this.state.bigFont,
      [styles['red']]: this.state.showBlue
    })
    return (
      <div>
        <div className={styles.red}>test02</div>
        <div className={btnClass}>hello I'm ...</div>
        <button onClick={this.changeBlue}>change blue</button>
      </div>
    )
  }
}