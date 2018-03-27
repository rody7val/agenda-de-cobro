// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoBack from '../utils/GoBack'
import './css/DeleteProvider.css';

export default class Counter extends Component<Props> {
  constructor(props) {
    super();
    this.state = {
      provider: {}
    }
  }

	componentWillMount() {
    fetch(`http://localhost:8000/provider/${this.props.providerId}`)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      this.setState({ provider: data.provider });
    });
  }

  render() {

    return (
    <div>
      <GoBack href='/provider' />
      
      <div className='content'>
        <div className='fluid' style={{padding: '30px'}}>
          <div className='flex'>
            <div
              className='avatar'
              style={{backgroundImage: `url(${this.state.provider.img})`}}></div>
            <div style={{display: 'block'}}>
    		      <h2>{this.state.provider.name}</h2>
    		      <p>{this.state.provider.email}</p>
              <small><i>{this.state.provider.iva}</i></small>
            </div>
          </div>
          <br/>
          <p><b>CUIL/CUIT:</b> <span className='number'>{this.state.provider.cuit}</span></p>
          <p><b>TELÉFONO:</b> <span className='number'>{this.state.provider.tel}</span></p>
          <p><b>DIRECCIÓN:</b> <span className='number'>{this.state.provider.dir}</span></p>
        </div>
    	</div>
      <div className='footerButtons'>
        <Link className='btn' to={`/provider/${this.props.providerId}/edit`}>
          <i>Editar</i>
        </Link>
        <Link className='btn' to={`/provider/${this.props.providerId}/delete`}>
          <i>Borrar</i>
        </Link>
      </div>
    </div>
    );
  }
}