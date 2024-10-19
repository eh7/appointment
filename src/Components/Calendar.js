import * as React from 'react'
import {
  Button,
  ButtonToolbar,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Form,
  FormGroup,
  Card,
  Row,
  Col,
  Container,
  FloatingLabel,
  Table,
//  MenuItem,
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
      selectedMonth: '9', 
      selectedYear: '2024', 
      currentDate: new Date(),
      lastClassName: '',
      errors: {},
      input: {},
    };
  }

  handleCurrentMonthView = () => {
    this.setState({
      selectedYear: this.state.currentDate.getFullYear(),
      selectedMonth: this.state.currentDate.getMonth(),
    })

//    this.setState({
//      selectedYear: '2024',
//      selectedMonth: '9',
//    })
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
    //console.log(e.target.id)
    this.setState({
      selectedYear: e.target.id.split('-')[1],
      selectedMonth: String(getMonthNumeric(e.target.id.split('-')[0]))
    })
    //console.log(e.target.id, this.state)
    //window.location = '/?id=' + e.target.id
    //this.state.selectedYear  = e.target.id.split('-')[1] 
    //this.state.selectedMonth = e.target.id.split('-')[0]
  }

  handleMonthMouseOver = (e) => {
    //alert('handleMonthMouseOver')
    this.state.lastClassName = document.getElementById(e.target.id).className
    //document.getElementById(e.target.id).className = 'text-center  bg-info'
  }

  handleMonthMouseOut = (e) => {
    //alert('handleMonthMouseOut')
    //document.getElementById(e.target.id).className = this.state.lastClassName
  }

  componentDidMount = async () => {
    console.log('componentDidMount')
  }

  componentDidUpdate = async () => {
    console.log('componentDidUpdate')
  }

  render() {
//    this.state.selectedYear  = '2024'
//    this.state.selectedMonth = '9'
//alert('render :: ' + JSON.stringify(this.state))

    const queryStringId = queryString.parse(window.location.search).id
    let queryStringMonth = null
    let queryStringYear = null 
    if (queryStringId) {
      [queryStringMonth, queryStringYear] = queryStringId.split('-')
    }

    const year = queryStringYear || this.state.selectedYear || '2024'
    const month = (getMonthNumeric(queryStringMonth) > -1) ? getMonthNumeric(queryStringMonth) : this.state.selectedMonth || '9' // months 0 to 11 (Jan to Dec)

    const monthString = getMonthDays(month)
    const thisMonthData = getWeeksInMonth(year, month))

//alert(new Date(year, month, 1))
    //const monthsArray = getMonthsArray(this.state.currentDate, 5)
    const monthsArray = getMonthsArray(new Date(year, month, 1), 12)
//console.log(monthsArray)
//alert(prevMonth)

    let rowCount = 0
    let currentDay = null

    const displayYear  = this.state.currentDate.toLocaleString('default', { year: 'numeric' })
    const displayMonth = this.state.currentDate.toLocaleString('default', { month: 'long' })

    if (this.state.currentDate.getMonth() === Number(month)) {
      currentDay = this.state.currentDate.getDate()
    }

    return (
      <Container className="mb-3">
        <Card>
          <Card.Header>Calendar for :: <i>{monthString} {year}</i></Card.Header>
          <Card.Body>
            <Card.Title>
              <Row>
                <Col className='text-start'>
                  <DropdownButton
                    as={ButtonGroup}
                    key='beforeCurrentDate'
                    id='dropdown-variants-warn-before'
                    variant='warn'
                    title="<< before"
                  >
                    { monthsArray[0].map((date, index) => {
                        //console.log(index, date)
                        const displayYear  = date.toLocaleString('default', { year: 'numeric' })
                        const displayMonth = date.toLocaleString('default', { month: 'long' })
                        //console.log({displayYear,displayMonth})
                        return (
                          <Dropdown.Item
                            id={displayMonth + '-' + displayYear}
                            className='text-center'
                            onClick={this.handleMonthClicked}
                            onMouseOver={this.handleMonthMouseOver}
                            onMouseOut={this.handleMonthMouseOut}
                          >
                            {displayMonth + ' ' + displayYear}
                          </Dropdown.Item>
                        )
                      })
                    }
                  </DropdownButton>
                </Col>
                <Col className='text-center'>
                  <div className='text-center bg-warning'>{monthString} {year}</div>
                </Col>
                <Col className='text-end'>
                  <DropdownButton
                    as={ButtonGroup}
                    key='afterCurrentDate'
                    id='dropdown-variants-warn-after'
                    variant='warn'
                    title="after >>"
                  >
                    { monthsArray[1].map((date, index) => {
                        //console.log(index, date)
                        const displayYear  = date.toLocaleString('default', { year: 'numeric' })
                        const displayMonth = date.toLocaleString('default', { month: 'long' })
                        //console.log({displayYear,displayMonth})
                        return (
                          <Dropdown.Item
                            id={displayMonth + '-' + displayYear}
                            className='text-center'
                            onClick={this.handleMonthClicked}
                            onMouseOver={this.handleMonthMouseOver}
                            onMouseOut={this.handleMonthMouseOut}
                          >
                            {displayMonth + ' ' + displayYear}
                          </Dropdown.Item>
                        )
                      })
                    }
                  </DropdownButton>
                </Col>
              </Row>
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
                                { (currentDay === rowItem && year === String(this.state.currentDate.getFullYear())) ? 
                                  (<td id={year + '::' + month + '::' + rowItem} onClick={this.handleTdClick} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut} className='text-center bg-warning'>
                                    {rowItem}
                                    {console.log(year, this.state.currentDate.getFullYear(),  year === String(this.state.currentDate.getFullYear()))}
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
             Current Time: <Button variant="link" id='currentMonthView' onClick={this.handleCurrentMonthView}>{ this.state.currentDate.toString() }</Button>
          </Card.Footer>
        </Card>
      </Container>
    )
  }
