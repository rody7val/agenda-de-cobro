// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoBack from '../utils/GoBack'

export default class ViewPago extends Component {
  constructor(props) {
    super();
    this.state = {
      pago: {},
      load: 'cargando...'
    }
  }

	componentDidMount() {
    fetch(`http://localhost:8000/pago/${this.props.pagoId}`)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      this.setState({ pago: data.pago });
      console.log(this.state.pago._provider._id)
    });
  }

  render() {

    return (
    <div>
      <GoBack href='/pago' />

      <div className='content'>
        <div className='fluid view'>
          <div className='flex'>
            <div style={{display: 'block'}}>
              {
                this.state.pago._provider ? (
                  <div>
                    <h2>Pago {this.state.pago.type}</h2>
                    <p><b>Al proveedor:</b> {this.state.pago._provider.name}</p>
                    <p><b>Total:</b> <span  className='mono'>$ {this.state.pago.total}</span></p>
                    <p><b>Descripción:</b> {this.state.pago.desc}</p>
                  </div>
                ) : (
                  <small>{this.state.load}</small>
                )
              }
    		      
              <div>
                <h3>Movimientos:</h3>
              </div>

            </div>
          </div>
        </div>
    	</div>
      <div className='footerButtons'>
        <Link className='btn' to={`/pago/${this.props.pagoId}/edit`}>
          <i>Editar</i>
        </Link>
        <Link className='btn' to={`/pago/${this.props.pagoId}/delete`}>
          <i>Borrar</i>
        </Link>
      </div>
    </div>
    );
  }
}