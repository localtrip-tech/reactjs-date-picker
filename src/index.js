/**
 * @localtrip-tech
 * Created by ashwamegh on 3/10/2018
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Calendar from './components/Calendar'
import getToday from './helper/getToday'
import styles from './index.css'

export default class ReactjsDatePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isCalendarVisible: false
    }

    this.documentClickHandler = this.documentClickHandler.bind(this)
    this.onClickCalendar = this.onClickCalendar.bind(this)
    this.onClickDatePicker = this.onClickDatePicker.bind(this)
    this.selectToday = this.selectToday.bind(this)
    this.showCalendar = this.showCalendar.bind(this)
    this.atCalendarFocusIn = this.atCalendarFocusIn.bind(this)
  }

  static propTypes = {
    disabled: PropTypes.bool,
    locale: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    range: PropTypes.arrayOf(PropTypes.number),
    value: PropTypes.string
  };

  componentDidMount() {
    document.addEventListener('click', this.documentClickHandler)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClickHandler)
  }

  documentClickHandler() {
    this.setState({
      isCalendarVisible: false
    })
  }

  onClickDatePicker(event) {
    // stop the click event
    event.nativeEvent.stopImmediatePropagation()
  }

  onClickCalendar(date) {
    this.setState({
      isCalendarVisible: false
    })
    this.props.onChange(date)
  }

  selectToday() {
    const { onChange } = this.props

    this.setState({
      isCalendarVisible: false
    })

    onChange(getToday())
  }

  showCalendar() {
    return (
      <Calendar
        onClickCalendar={this.onClickCalendar}
        date={this.props.value}
        selectToday={this.selectToday}
        range={this.props.range}
        locale={this.props.locale}
      />
    )
  }

  atCalendarFocusIn() {
    if (this.props.disabled === true) {
      return
    }
    this.setState({
      isCalendarVisible: true
    })
  }

  render() {
    const { isCalendarVisible } = this.state
    const { disabled, value } = this.props

    console.log(styles)

    return (
      <div className={styles.datePicker} onClick={this.onClickDatePicker}>
        <input
          className={`${styles.datePicker__input} ${
            disabled === true ? styles['datePicker__input--disabled'] : ''
          }`}
          type='text'
          onFocus={this.atCalendarFocusIn}
          value={value}
          readOnly
          disabled={disabled}
        />
        {isCalendarVisible === false ? null : this.showCalendar()}
      </div>
    )
  }
}
