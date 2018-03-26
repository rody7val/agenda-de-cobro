// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './css/DeleteProvider.css';

export default class Counter extends Component<Props> {
  constructor(props) {
    super();
    this.state = {
      client: {}
    }
  }

	componentWillMount() {
    fetch(`http://localhost:8000/client/${this.props.clientId}`)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      console.log(data.client)
      this.setState({ client: data.client });
    });
  }

  render() {

    return (
    <div>
      <div className='backButton'>
        <Link to='/client'>
          <i className='fa fa-arrow-left fa-3x' />
        </Link>
      </div>
      <div className='content'>
        <div className='fluid' style={{padding: '30px'}}>
          <div className='flex'>
            <div
              className='avatar'
              style={{backgroundImage: `url(${this.state.client.img})`}}></div>
            <div style={{display: 'block'}}>
    		      <h2>{this.state.client.name}</h2>
    		      <p>{this.state.client.email}</p>
              <small><i>{this.state.client.iva}</i></small>
            </div>
          </div>
          <br/>
          <p><b>CUIL/CUIT:</b> <span className='number'>{this.state.client.cuit}</span></p>
          <p><b>TELÉFONO:</b> <span className='number'>{this.state.client.tel}</span></p>
          <p><b>DIRECCIÓN:</b> <span className='number'>{this.state.client.dir}</span></p>
        </div>
    	</div>
      <div className='footerButtons'>
        <Link className='btn' to={`/client/${this.props.clientId}/edit`}>
          <i>Editar</i>
        </Link>
        <Link className='btn' to={`/client/${this.props.clientId}/delete`}>
          <i>Borrar</i>
        </Link>
      </div>
    </div>
    );
  }
}