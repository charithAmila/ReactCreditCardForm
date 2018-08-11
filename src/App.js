import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'

class App extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                CREDIT CARD FORM
              </a>
            </div>
          </div>
        </nav>
        <Home />
      </div>
    );
  }
}

export default App;
