// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default class Home extends Component {

  render() {
    return (
      <div>
        <div className="container">
          <h2>Agenda de cobros</h2>
          <Link to="/provider">Proveedores</Link>
        </div>
      </div>
    );
  }
}