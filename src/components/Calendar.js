/**
 * @localtrip-tech
 * Infused by ashwamegh 03/10/2018
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectYear from './SelectYear'
import SelectMonth from './SelectMonth'
import WeekDays from './WeekDays'
import getToday from './../helper/getToday'

class Calendar extends Component {
  static propTypes = {
    date: PropTypes.string,
    locale: PropTypes.string,
    onClickCalendar: PropTypes.func.isRequired,
    range: PropTypes.arrayOf(PropTypes.number),
    selectToday: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    const { date } = this.props
    const dateSelected = new Date(date || getToday())
    const month = dateSelected.getMonth() + 1

    this.state = {
      day: dateSelected.getDate(),
      month,
      year: dateSelected.getFullYear()
    }

    this.getPrevMonth = this.getPrevMonth.bind(this)
    this.getNextMonth = this.getNextMonth.bind(this)
    this.mutateDate = this.mutateDate.bind(this)
    this.selectYear = this.selectYear.bind(this)
    this.selectDay = this.selectDay.bind(this)
    this.selectMonth = this.selectMonth.bind(this)
  }

  getPrevMonth() {
    const { range } = this.props
    const { month, year } = this.state
    const minYear = range[0]
    const maxYear = range[1]

    if (month === 1) {
      this.setState({
        month: 12,
        year: year === minYear ? maxYear : year - 1
      })
    } else {
      this.setState({
        month: month - 1
      })
    }
  }

  getNextMonth() {
    const { range } = this.props
    const { month, year } = this.state
    const minYear = range[0]
    const maxYear = range[1]

    if (month === 12) {
      this.setState({
        month: 1,
        year: year === maxYear ? minYear : year + 1
      })
    } else {
      this.setState({
        month: month - 1
      })
    }
  }

  mutateDate() {
    const { onClickCalendar } = this.props
    const month = String(month).length < 2 ? `0${this.state.month}` : `${this.state.month}`
    const day = String(this.state.day).length < 2 ? `0${this.state.day}` : `${this.state.day}`
    const date = `${this.state.year}-${month}-${day}`

    onClickCalendar(date)
  }

  selectYear(year) {
    this.setState({
      year
    })
  }

  selectDay(day) {
    this.setState({
      day
    }, () => this.mutateDate())
  }

  selectMonth(month) {
    this.setState({
      month
    })
  }

  render() {
    const { year, month, day } = this.state
    const { range, locale, date, selectToday } = this.props

    return (
      <div className='datePicker__calendar'>
        <div className='datePicker__calendar__header'>
          <span onClick={this.prevMonth} className='datePicker__prev' />
          <SelectYear year={Number(year)} selectYear={this.selectYear} range={range} />
          <SelectMonth month={Number(month)} selectMonth={this.selectMonth} locale={locale} />
          <span onClick={this.nextMonth} className='datePicker__next' />
        </div>
        <WeekDays locale={locale} highlight={new Date(date).getFullYear() === year && new Date(date).getMonth() + 1 === month} year={Number(year)} month={Number(month)} day={Number(day)} selectDay={this.selectDay} />
        <div className='datePicker__btnGroup'><button className='datePicker__btn datePicker__btn--today' onClick={selectToday}>{'Today'}</button></div>
      </div>
    )
  }
}

export default Calendar
