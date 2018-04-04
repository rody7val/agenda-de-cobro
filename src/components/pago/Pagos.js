// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoBack from '../utils/GoBack';
import moment from 'moment';
import 'moment/locale/es';

import './Pagos.css';

export default class Pagos extends Component {
  constructor(props) {
    super();
    this.state = {
      pagos: [],
      cargando: 'cargando',
      type: "Todos",
      // day: moment().format('YYYY-MM-DD'),
      // month: moment().format('YYYY-MM'),
      // year: moment().format('YYYY'),
      load: "cargando..."
    }

    this.inputChange = this.inputChange.bind(this)
    this.findByType = this.findByType.bind(this)
    this.findAll = this.findAll.bind(this)
  }

  inputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if (value === 'Todos') {
      this.findAll();
      return false;
    }

    this.findByType(value);
  }

  findByType = (type) => {
    this.setState({ load: 'cargando...' });

    fetch(`http://localhost:8000/pago/type/${type}`)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        if (!data.success) {
          this.setState({load: data.errors.message});
          return false;
        }

        if (data.pagos.length > 0) {
          this.setState({ pagos: data.pagos });
        } else {
          this.setState({ pagos: [] });
          this.setState({ load: 'No hay pagos' });
        }

      });
  }

  findAll = () => {
    fetch('http://localhost:8000/pago/')
      .then((response) => {
        return response.json();
      })
      .then(data => {
        if (!data.success) {
          this.setState({load: data.errors.message});
          return false;
        }

        if (data.pagos.length > 0) {
          this.setState({ pagos: data.pagos });
        } else {
          this.setState({ pagos: [] });
          this.setState({ load: 'No hay pagos.' });
        }

      });
  }

  componentWillMount() {
    this.findAll();
  }

  render() {
    return (
    <div>
      <GoBack href='/' />
      
      <div className='footerButtons'>
          <Link className='btn' to="/pago/new">
            <i className="fa fa-plus" />
          </Link>
      </div>

      <div className='content list'>
          <h2>Pagos</h2>
          <form>
            <div className='formSearchGroup'>
              <label>de tipo</label>
              <select
                name='type'
                style={{ height: "26px" }}
                value={this.state.type}
                onChange={this.inputChange}>
                  <option value='Todos'>Todos</option>
                  <option value='Unico'>Unico</option>
                  <option value='Mensual'>Mensual</option>
                  <option value='Anual'>Anual</option>
              </select>
            </div>

          </form>
          <div className='fluid listPago'>
            <ul>
              <hr/>
              <li className='li-header'>
                <div className='flex'>
                  <b className='_ center'>#</b>
                  <b className='name'>Proveedor</b>
                  <b className='importe'>Importe</b>
                  <b className='importe'>Tipo</b>
                  <b className='state center'>Estado</b>
                </div>
              </li>
              <hr/>
              {
                this.state.pagos.length > 0 ? this.state.pagos.map(pago => {
                  return (
                    <div key={pago._id}>
                    <li>
                      <Link className='li-hover' to={`/pago/${pago._id}`}>
                        <div className='flex'>
                          <div
                            className='avatarList _'
                            style={{backgroundImage: `url('img/default-img.jpeg')`}}></div>
                          <p style={{textTransform: "uppercase"}}
                            className='name'>{ pago._provider.name.length >= 16 ? (
                            `${pago._provider.name.substring(0,18)}...`
                          ) : (
                            pago._provider.name
                          )
                          }</p>
                          <p className='importe mono'>$ {pago.total}</p>
                          <p className='importe'>{pago.type}</p>
                          {
                            pago.state ? (
                              <div className='state'>
                                <span
                                  style={{marginTop: '15px'}}
                                  className='badge badgeSuccess'>Ok</span>
                              </div>
                            ) : (
                              <div className='state'>
                                <span
                                  style={{marginTop: '15px'}}
                                  className='badge badgeDanger'>No pagado</span>
                              </div>
                            )
                          }
                        </div>
                      </Link>
                    </li>
                    <hr/>
                    </div>
                  )
                }) : (
                  <p>{this.state.load}</p>
                )
              }
            </ul>
          </div>

        </div>

      </div>
    );
  }
}
          // <Calendar format='DD/MM/YYYY' date='4-12-2014' />
                    // <li>
                      // <div className='flex'>
                        // <Link to={`/pago/${pago._id}`}>
                          // {moment(`${pago.date}`).unix()}
                          // <div
                            // className='avatarList'
                            // style={{backgroundImage: `url(${pago._provider.img})`}}></div>
                          // <p>{pago._provider.name}</p>
                          // <p>{pago.total}</p>
                        // </Link>
                      // </div>
                      // <hr/>
                    // </li>

              // {
                // (()=>{
                  // switch(this.state.type) {
                    // case 'Unico':
                      // return (
                        // <div className='formSearchGroup'>
                          // <label>el día</label>
                          // <input
                            // name='day'
                            // type='date'
                            // value={this.state.day}
                            // onChange={this.inputChange}/>
                        // </div>
                      // )
                      // break;
                    // case 'Semanal':
                      // return (
                        // <div className='formSearchGroup'>
                          // <label>de la</label>
                          // <input
                            // name='week'
                            // type='week'
                            // value={this.state.week}
                            // onChange={this.inputChange}/>
                        // </div>
                      // )
                      // break;
                    // case 'Mensual':
                      // return (
                        // <div className='formSearchGroup'>
                          // <label>del mes</label>
                          // <input
                            // name='month'
                            // type='month'
                            // value={this.state.month}
                            // onChange={this.inputChange}/>
                        // </div>
                      // )
                      // break;
                    // case 'Anual':
                      // return (
                        // <div className='formSearchGroup'>
                          // <label>del año</label>
                          // <input
                            // name='year'
                            // type="number"
                            // min="1900"
                            // max="2099"
                            // step="1"
                            // value={this.state.year}
                            // onChange={this.inputChange}/>
                        // </div>
                      // )
                      // break;
                  // }
                // })()
              // }

                  // switch (this.state.type){
    //   case 'Unico':
    //     let dateDay = this.state.day.split('-');
    //     date = new Date(Number(dateDay[0]), Number(dateDay[1]), Number(dateDay[2])).getTime();
    //     break;
    //   case 'Mensual':
    //     let dateMont = this.state.month.split('-');
    //     date = new Date(Number(dateMont[0]), Number(dateMont[1]), 0).getTime();
    //     break;
    //   case 'Anual':
    //     date = new Date(this.state.year).getTime();
    //     break;
    // }