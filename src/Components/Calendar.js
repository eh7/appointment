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

  componentDidMount = async () => {
  }

  render() {
    let rowCount = 0
    const thisMonthData = getWeeksInMonth('2024', '9'))
    return (
      <Container className="mb-3">
        <Card>
          <Card.Header>Calendar</Card.Header>
          <Card.Body>
            <Card.Title>
              Card Title
            </Card.Title>
            <Card.Text>
              Card text goes here...
              <Table striped bordered hover>
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
                                <td className='text-center'>
                                 {rowItem}
                                </td>
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
