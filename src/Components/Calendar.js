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
import {
  getWeeksInMonth,
  getMonthDays,
  daysOfTheWeek,
} from '../services/DateData' 

export default class Calendar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      errors: {},
      input: {},
    };
  }

  handleTdClick = (e) => {
    console.log('handleTdClick e ::', e)
    alert('td onclick :: ' + e.target.id)
  }

  handleOnMouseOver = (e) => {
    //alert('td onMouseOver :: ' + e.target.id)
    //alert(document.getElementById(e.target.id).style.backgroundColor)
    document.getElementById(e.target.id).style.backgroundColor = 'yellow'
  }

  handleOnMouseOut = (e) => {
    //alert('td onMouseOut :: ' + e.target.id)
    document.getElementById(e.target.id).style.backgroundColor = ''
  }

  componentDidMount = async () => {
  }

  render() {
    const year = '2024'
    const month = '9' // months 0 to 11 (Jan to Dec)
    const monthString = getMonthDays(month)
    const thisMonthData = getWeeksInMonth(year, month))

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
          <Card.Header>Calendar</Card.Header>
          <Card.Body>
            <Card.Title>
              {monthString} {year}
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
                                  (<td className="table-active" id={year + '::' + month + '::' + rowItem} onClick={this.handleTdClick} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut} className='text-center'>
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
