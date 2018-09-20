import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Login/>
        <Register/>
      </div>
    );
  }
}

export default App;
