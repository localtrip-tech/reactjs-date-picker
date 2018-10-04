import React, { Component } from 'react'

import ReactjsDatePicker from 'reactjs-date-picker'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }

    this.log = this.log.bind(this);
  }

  log(date){
    this.setState({
			value: date
		});
  }

  render () {
    return (
      <div>
        <ReactjsDatePicker {...this.state} onChange={this.log} />
      </div>
    )
  }
}
