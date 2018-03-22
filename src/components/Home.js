// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className="container">
          <h2>Agenda de cobros</h2>
          <Link to="/counter">Contador</Link>
          <Link to="/provider">Proveedores</Link>
        </div>
      </div>
    );
  }
}