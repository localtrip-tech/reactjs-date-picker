/**
 * @localtrip-tech
 * Infused by ashwamegh 03/10/2018
 */

import React, { Component } from 'react'
import SelectYear from './selectYear'
import SelectMonth from './selectMonth'
import WeekDays from './weekDays'
import getTodayMixin from './getTodayMixin'
import PropTypes from 'prop-types'

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
    const dateSelected = new Date(date || this.getToday())
    const month = dateSelected.getMonth() + 1

    this.state = {
      day: dateSelected.getDate(),
      month,
      year: dateSelected.getFullYear()
    }
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
    const month = String(this.state.month).length < 2 ? `0${month}` : `${month}`
    const day = String(this.state.day).length < 2 ? `0${day}` : `${day}`
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

  SelectMonth(month) {
    this.setState({
      month
    })
  }

  render() {
    return (
      <div className='datePicker__calendar'>
        <div className='datePicker__calendar__header'>
          <span onClick={this.prevMonth} className='datePicker__prev' />
          <SelectYear year={Number(this.state.year)} selectYear={this.selectYear} range={this.props.range} />
          <SelectMonth month={Number(this.state.month)} selectMonth={this.selectMonth} locale={this.props.locale} />
          <span onClick={this.nextMonth} className='datePicker__next' />
        </div>
        <WeekDays locale={this.props.locale} highlight={new Date(this.props.date).getFullYear() === this.state.year && new Date(this.props.date).getMonth() + 1 === this.state.month} year={Number(this.state.year)} month={Number(this.state.month)} day={Number(this.state.day)} selectDay={this.selectDay} />
        <div className='datePicker__btnGroup'><button className='datePicker__btn datePicker__btn--today' onClick={this.props.selectToday}>{this.props.locale === 'zh' ? '今天' : 'Today'}</button></div>
      </div>
    )
  }
}

export default Calendar
