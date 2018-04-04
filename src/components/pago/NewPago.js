// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import GoBack from '../utils/GoBack';
// import './css/NewProvider.css';

export default class Counter extends Component {
  constructor(props) {
    super();
    this.state = {
      type: 'Mensual',
      // date: undefined,
      desc: '',
      total: 0.00,
      state: false,
      _provider: undefined,
      providers: [],
      err__provider: '',
      ok: false
    }

    this.submit = this.submit.bind(this)
    this.inputChange = this.inputChange.bind(this)
  }

  inputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.state._provider) {
      this.setState({ err__provider: '' });

      let data = {
        pago: {
          type: e.target.type.value,
          desc: e.target.desc.value,
          total: Number(e.target.total.value),
          state: true,
          _provider: e.target._provider.value
        }
      };

      fetch('http://localhost:8000/pago/new', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data.success) {
          this.props.notify('Proveedor creado!')
          this.setState({ ok: true })
          return false
        }
        for(let prop in data.errors) {
          console.log('err_' + prop, data.errors[prop].message)
          let propErr = 'err_' + prop
          this.setState({
            [propErr]: data.errors[prop].message
          })
        }
      });

      return false
    }
    
    this.setState({ err__provider: 'Debes seleccionar un "Proveedor" a quien pagar. Si no hay ninguno, crea uno en la sección de inicio.' });
  }

  componentWillMount = () => {
    fetch('http://localhost:8000/provider/')
      .then((response) => {
        return response.json();
      })
      .then(data => {
        this.setState({ providers: data.providers });
      });
  }

  render() {

    return (
    <div>
    {
      this.state.ok ? (
        <Redirect to='/pago'/>
      ) : (
        <div>
          <GoBack href='/pago' />
          
          <div className='form'>
            <h2>Nuevo Proveedor</h2>
            <div className='fluidForm'>

              <form onSubmit={this.submit}>
                <div className='formGroup'>
                  <label>Tipo</label>
                  <select
                    name='type'
                    className='formControl full'
                    value={this.state.type}
                    onChange={this.inputChange}>
                      <option value='Unico'>Unico</option>
                      <option value='Mensual'>Mensual</option>
                      <option value='Anual'>Anual</option>
                  </select>
                </div>

                <div className='formGroup'>
                  <label>Al Proveedor</label>
                  <select
                    name='_provider'
                    className='formControl full'
                    value={this.state._provider}
                    onChange={this.inputChange}>
                      <option selected disabled value=''>SELECCIONAR UN PROVEEDOR</option>
                      {
                        this.state.providers.length > 0 ? this.state.providers.map(provider => {
                          return (
                            <option value={provider._id} >{provider.name}</option>
                          )
                        }): (
                          <option value='' disabled>NO HAY PROVEEDORES</option>
                        )
                      }
                  </select>
                  {
                    this.state.err__provider ? (
                      <small className='formText'>
                        {this.state.err__provider}
                      </small>
                    ) : null
                  }
                </div>

                <div className='formGroup'>
                  <label>Monto</label>
                  <input
                    name='total'
                    type='number'
                    className='formControl full'
                    min='0.00'
                    step="0.05"
                    value={this.state.year}
                    onChange={this.inputChange}/>
                </div>

                <div className='formGroup'>
                  <label>Descripción</label>
                  <input
                    name='desc'
                    type='text'
                    className='formControl full'
                    placeholder='Obligación mensual'
                    value={this.state.desc}
                    onChange={this.inputChange}/>
                </div>

                <div className='formFooterButtons'>
                  <button className='btn'>Crear</button>
                </div>
                <br/>
              </form>
            </div>
          </div>
        </div>
      )
    }

    </div>
    );
  }
}