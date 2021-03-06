/**
 * @localtrip-tech
 * Infused by ashwamegh on 03/10/2018
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './selectMonth.css'

class SelectMonth extends Component {
  static propTypes = {
    locale: PropTypes.string,
    month: PropTypes.number,
    selectMonth: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)

    this.handleMonthChange = this.handleMonthChange.bind(this)
  }

  handleMonthChange(event) {
    const { selectMonth } = this.props

    selectMonth(Number(event.currentTarget.value))
  }

  render() {
    const { month } = this.props
    const months = [
      'January',
      'February',
      'March',
      ' April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    const monthOptions = months.map((month, index) => {
      return (
        <option key={index} value={index + 1}>
          {`${month}`}
        </option>
      )
    })

    return (
      <select
        name=''
        id=''
        className={styles.datePicker__month}
        value={month}
        onChange={this.handleMonthChange}
      >
        {monthOptions}
      </select>
    )
  }
}

export default SelectMonth
