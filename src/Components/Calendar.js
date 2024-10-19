import * as React from 'react'
import {
  Button,
  Form,
  FormGroup,
  Card,
  Row,
  Col,
  Container,
  FloatingLabel,
  Table,
} from 'react-bootstrap'
import queryString from "query-string"
import {
  getWeeksInMonth,
  getMonthDays,
  getMonthNumeric,
  getMonthsArray,
  daysOfTheWeek,
} from '../services/DateData' 

export default class Calendar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedMonth: '', 
      selectedYear: '', 
      currentDate: new Date(),
      lastClassName: '',
      errors: {},
      input: {},
    };
  }

  handleTdClick = (e) => {
    console.log('handleTdClick e ::', e)
    alert('td onclick :: ' + e.target.id)
  }

  handleOnMouseOver = (e) => {
    this.state.lastClassName = document.getElementById(e.target.id).className
    document.getElementById(e.target.id).className = 'text-center  bg-info'
  }

  handleOnMouseOut = (e) => {
    document.getElementById(e.target.id).className = this.state.lastClassName
  }

  handleMonthClicked = (e) => {
    console.log(e.target.id)
    window.location = '/?id=' + e.target.id
    //alert('handleMonthClicked')
  }

  handleMonthMouseOver = (e) => {
    //alert('handleMonthMouseOver')
    this.state.lastClassName = document.getElementById(e.target.id).className
    document.getElementById(e.target.id).className = 'text-center  bg-info'
  }

  handleMonthMouseOut = (e) => {
    //alert('handleMonthMouseOut')
    document.getElementById(e.target.id).className = this.state.lastClassName
  }

  componentDidMount = async () => {
  }

  render() {
    this.state.selectedYear  = '2024'
    this.state.selectedMonth = '9'

    const queryStringId = queryString.parse(window.location.search).id
    let queryStringMonth = null
    let queryStringYear = null 
    if (queryStringId) {
      [queryStringMonth, queryStringYear] = queryStringId.split('-')
    }

    const year = queryStringYear || '2024'
    const month = (getMonthNumeric(queryStringMonth) > -1) ? getMonthNumeric(queryStringMonth) :'9' // months 0 to 11 (Jan to Dec)
    const monthString = getMonthDays(month)
    const thisMonthData = getWeeksInMonth(year, month))

//    const prevMonth = new Date(
//      this.state.currentDate.getFullYear(),
//      this.state.currentDate.getMonth() - 1,
//      1,
//    )
    const monthsArray = getMonthsArray(this.state.currentDate, 5)
//console.log(monthsArray)
//alert(prevMonth)

    let rowCount = 0
    let currentDay = null

    const displayYear  = this.state.currentDate.toLocaleString('default', { year: 'numeric' })
    const displayMonth = this.state.currentDate.toLocaleString('default', { month: 'long' })
    //const currentMonth = this.state.currentDate.toLocaleString('default', { month: 'long' });
    //const currentMonth = this.state.currentDate.toLocaleString('default', { month: 'numeric' });
    //console.log(this.state.currentDate.getMonth(), Number(month))
    if (this.state.currentDate.getMonth() === Number(month)) {
      currentDay = this.state.currentDate.getDate()
    }
    //console.log(currentDay)

    return (
      <Container className="mb-3">
        <Card>
          <Card.Header>Calendar for :: <i>{monthString} {year}</i></Card.Header>
          <Card.Body>
            <Card.Title>
              { monthsArray[0].map((date, index) => {
                  console.log(index, date)
                  const displayYear  = date.toLocaleString('default', { year: 'numeric' })
                  const displayMonth = date.toLocaleString('default', { month: 'long' })
                  console.log({displayYear,displayMonth})
                  return (
                    <div
                      id={displayMonth + '-' + displayYear}
                      className='text-center'
                      onClick={this.handleMonthClicked}
                      onMouseOver={this.handleMonthMouseOver}
                      onMouseOut={this.handleMonthMouseOut}
                    >
                      {displayMonth + ' ' + displayYear}
                    </div>
                  )
                })
              }
              <div className='text-center bg-warning'>{monthString} {year}</div>
              { monthsArray[1].map((date, index) => {
                  console.log(index, date)
                  const displayYear  = date.toLocaleString('default', { year: 'numeric' })
                  const displayMonth = date.toLocaleString('default', { month: 'long' })
                  console.log({displayYear,displayMonth})
                  return (
                    <div
                      id={displayMonth + ' ' + displayYear}
                      className='text-center'
                      onClick={this.handleMonthClicked}
                      onMouseOver={this.handleMonthMouseOver}
                      onMouseOut={this.handleMonthMouseOut}
                    >
                      {displayMonth + ' ' + displayYear}
                    </div>
                  )
                })
              }
            </Card.Title>
            <Card.Text>
              <Table striped bordered /*hover*/>
                <thead>
                  <tr>
                    { daysOfTheWeek.map((day) => {
                      return (
                        <th className='text-center'>
                          {day}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  { thisMonthData.map((item, index) => {
                      return (
                        <tr>
                          { item.dates.map((rowItem, rowIndex) => {
                            {rowCount++}
                            return (
                              <>
                                { (
                                    index == 0 && 
                                    item.dates.length < 7 &&
                                    rowCount == 1
                                  ) &&
                                  <td colSpan={7 - item.dates.length}></td>
                                }
                                { (currentDay === rowItem) ? 
                                  (<td id={year + '::' + month + '::' + rowItem} onClick={this.handleTdClick} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut} className='text-center bg-warning'>
                                    {rowItem}
                                  </td>) :
                                  (<td id={year + '::' + month + '::' + rowItem} onClick={this.handleTdClick} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut} className='text-center'>
                                   {rowItem}
                                  </td>)
                                }
                              </>
                            )
                          })}
                        </tr>
                      )
                    })
                  }  
                </tbody>
              </Table>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
             Current Time: { this.state.currentDate.toString() }
          </Card.Footer>
        </Card>
      </Container>
    )
  }
