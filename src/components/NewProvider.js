// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import './NewProvider.css';

export default class Counter extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      email: '',   
      err_name: '',
      err_email: '',
      ok: false
    }

    this.submit = this.submit.bind(this)
    this.inputChange = this.inputChange.bind(this)
  }

  notify = (msj) => {
    if (!("Notification" in window)) {
      alert(msj);
    }
    else if (Notification.permission === "granted") {
      new Notification(msj);
    }
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          new Notification(msj);
        }
      });
    }
  }

  inputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(target.type);

    this.setState({
      [name]: value
    });
  }

  submit = (e) => {
    e.preventDefault();

    this.setState({
      err_name: '',
      err_email: ''
    });

    let data = {
      provider: {
        name: e.target.name.value, 
        email: e.target.email.value
      }
    };

    fetch('http://localhost:8000/provider/new', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.success) {
        this.notify('Proveedor creado!');
        this.setState({ ok: true });
        return false;
      }

      for(let prop in data.errors) {
        console.log('err_' + prop, data.errors[prop].message)
        let propErr = 'err_' + prop;
        this.setState({
          [propErr]: data.errors[prop].message
        })
      }

    });
  }

  render() {

    return (
    <div>
    {
      this.state.ok ? (
        <Redirect to='/'/>
      ) : (
        <div>
          <div className='backButton'>
            <Link to='/'>
              <i className='fa fa-arrow-left fa-3x' />
            </Link>
          </div>
          <form className='form' onSubmit={this.submit}>
            <div className='formGroup'>
              <label>Nombre</label>
              <input
                name='name'
                type='text'
                placeholder='Nombre'
                value={this.state.name}
                onChange={this.inputChange}/>
              {
                this.state.err_name ? (
                  <small className='formText'>
                    {this.state.err_name}
                  </small>
                ) : null
              }
            </div>
            <div className='formGroup'>
              <label>Email</label>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={this.state.email}
                onChange={this.inputChange}/>
              {
                this.state.err_email ? (
                  <small className='formText'>
                    {this.state.err_email}
                  </small>
                ) : null
              }
            </div>
            <button className='btn'>Crear</button>
          </form>
        </div>
      )
    }
    </div>
    );
  }
}