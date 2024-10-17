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
} from 'react-bootstrap';

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
            </Card.Text>
          </Card.Body>
          <Card.Footer>
             Current Time: { this.state.currentDate.toString() }
          </Card.Footer>
        </Card>
      </Container>
    )
  }
