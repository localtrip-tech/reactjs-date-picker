/**
 * @localtrip-tech
 * Infused by ashwamegh on 03/10/2018
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Week from './Week'

class WeekDays extends Component {
  static propTypes = {
    day: PropTypes.number.isRequired,
    highlight: PropTypes.bool,
    locale: PropTypes.string,
    month: PropTypes.number.isRequired,
    range: PropTypes.arrayOf(PropTypes.number),
    selectDay: PropTypes.func.isRequired,
    year: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)

    this.selectDay = this.selectDay.bind(this)
  }

  selectDay(day) {
    const { selectDay } = this.props
    selectDay(day)
  }

  render() {
    const { year, month, highlight, range, day } = this.props
    const daysInSelectedMonth = new Date(year, month, 0).getDate()
    const firstDay = new Date(year, month - 1, 1).getDay()
    const daysRange = [...Array(daysInSelectedMonth)].map((_, i) => i + 1)

    for (let i = 0, l = firstDay; i < l; i++) {
      daysRange.unshift(undefined)
    }

    const weekChunks = []

    while (daysRange.length > 0) {
      weekChunks.push(daysRange.splice(0, 7))
    }

    const weekDays = []

    for (let j = 0, len = weekChunks.length; j < len; j++) {
      if (weekChunks[j].length < 7) {
        for (let m = weekChunks[j].length, n = 7; m < n; m++) {
          weekChunks[j].push(undefined)
        }
      }

      weekDays.push(<Week key={j} highlight={highlight} days={weekChunks[j]} selectDay={this.selectDay} day={day} />)
    }

    const weekTitle = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((dayTitle) => <th key={dayTitle}>{dayTitle}</th>)

    return (
      <table>
        <thead>
          <tr>
            {weekTitle}
          </tr>
        </thead>
        <tbody>
          {weekDays}
        </tbody>
      </table>
    )
  }
}

export default WeekDays
