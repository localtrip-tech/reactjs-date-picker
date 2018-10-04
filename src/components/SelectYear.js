/**
 * @localtrip-tech
 * Infused by ashwamegh on 03/10/2018
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SelectYear extends Component {
  static propTypes = {
    range: PropTypes.arrayOf(PropTypes.number),
    selectYear: PropTypes.func.isRequired,
    year: PropTypes.number
  };

  handleYearChange(event) {
    const { selectYear } = this.props
    selectYear(Number(event.currentTarget.value))
  }

  render() {
    const { range, year } = this.props
    const startYear = typeof range === undefined ? 1984 : range[0]
    const endYear = typeof range === undefined ? 2050 : range[1]
    const options = []

    for (let i = startYear, l = endYear; i <= l; i++) {
      options.push(i)
    }

    const yearOptions = options.map(year => (
      <option key={year} value={year}>
        {year}
      </option>
    ))

    return (
      <select value={year}
        className='datePicker__year'
        onChange={this.handleYearChange}>
        {yearOptions}
      </select>
    )
  }
}

export default SelectYear
