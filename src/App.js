import * as React from 'react'
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Calendar from './Components/Calendar'

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      setup: true,
      address: null,
    };
  }

  componentDidMount = async () => {
    //alert('componentDidMount :: ' + this.state.address)
  }

  render() {
    return (
      <div className="App">
        <Calendar/>
      </div>
    )
  }
}
