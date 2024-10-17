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
} from 'react-bootstrap'
import { getWeeksInMonth } from '../services/DateData' 

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
    const monthData = getWeeksInMonth('2024', '10'))
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
              { monthData.map((item, index) => {
                  console.log(index, item)
                })
              }  
            </Card.Text>
          </Card.Body>
          <Card.Footer>
             Current Time: { this.state.currentDate.toString() }
          </Card.Footer>
        </Card>
      </Container>
    )
  }
