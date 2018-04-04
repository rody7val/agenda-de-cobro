// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoBack from '../utils/GoBack'
// import './css/DeleteProvider.css';

export default class Counter extends Component<Props> {
  constructor(props) {
    super();
    this.state = {
      entity: {}
    }
  }

	componentWillMount() {
    fetch(`http://localhost:8000/entity/${this.props.entityId}`)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      this.setState({ entity: data.entity });
    });
  }

  render() {

    return (
    <div>

      <GoBack href='/' />

      <div className='footerButtons' style={{zIndex: 1}}>
        <Link className='btn' to={`/entity/${this.props.entityId}/edit`}>
          <i>Editar</i>
        </Link>
      </div>

      <div className='content'>
        <div className='fluid'>
          <div className='flex'>
            <div
              className='avatar'
              style={{backgroundImage: `url(${this.state.entity.img})`}}></div>
            <div style={{display: 'block'}}>
    		      <h2>{this.state.entity.name}</h2>
    		      <p>{this.state.entity.email}</p>
              <small><i>{this.state.entity.iva}</i></small>
            </div>
          </div>
          <br/>
          <p><b>CUIL/CUIT:</b> <span className='number'>{this.state.entity.cuit}</span></p>
          <p><b>TELÉFONO:</b> <span className='number'>{this.state.entity.tel}</span></p>
          <p><b>DIRECCIÓN:</b> <span className='number'>{this.state.entity.dir}</span></p>
        </div>
    	</div>
    </div>
    );
  }
}