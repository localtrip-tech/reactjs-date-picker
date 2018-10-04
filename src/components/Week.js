/**
 * @localtrip-tech
 * Infused by ashwamegh on 03/10/2018
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Week extends Component {
  static propTypes = {
    day: PropTypes.number,
    days: PropTypes.array.isRequired,
    highlight: PropTypes.bool,
    selectDay: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    const { selectDay } = this.props
    selectDay(event.target.textContent)
  }

  render() {
    const { days, day, highlight } = this.props
    const weekDays = (typeof days === undefined ? [] : days).map((weekDay, index) => {
      if (weekDay) {
        if (weekDay === day && highlight) {
          return <td key={index} className={`datePicker__day--today datePicker__day`} onClick={this.handleClick} >{weekDay}</td>
        } else {
          return <td key={index} className='datePicker__day' onClick={this.handleClick}>{weekDay}</td>
        }
      } else {
        return <td key={index} className={`datePicker__day--disabled datePicker__day`} />
      }
    }, this)

    return (
      <tr>{weekDays}</tr>
    )
  }
}

export default Week
