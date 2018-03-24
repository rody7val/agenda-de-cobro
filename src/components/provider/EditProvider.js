// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
// import './css/EditProvider.css';

export default class Counter extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      email: '',
      cuit: '',
      iva: '',
      tel: '',
      dir: '',
      err_name: '',
      err_email: '',
      err_cuit: '',
      img: '',
      ok: false
    }

    this.edit = this.edit.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.imgUpload = this.imgUpload.bind(this);
  }

	componentWillMount() {
    fetch(`http://localhost:8000/provider/${this.props.providerId}`)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      this.setState({
      	name: data.provider.name,
      	email: data.provider.email,
        cuit: data.provider.cuit,
        iva: data.provider.iva,
        tel: data.provider.tel,
        dir: data.provider.dir,
        img: data.provider.img
      });
    });
  }

  imgUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('img', e.target.files[0]);
    
    fetch('http://localhost:8000/img/upload', {
      method: 'POST',
      body: formData,
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      let path = data.path.replace(/\\/g, "/");

      this.setState({
        img: path.replace(/.*\/public/, '')
      });
    });
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

  edit = (e) => {
    e.preventDefault();

    this.setState({
      err_name: '',
      err_email: '',
      err_cuit: ''
    });

    let data = {
      provider: {
        name: e.target.name.value, 
        email: e.target.email.value,
        iva: e.target.iva.value,
        cuit: e.target.cuit.value,
        tel: e.target.tel.value,
        dir: e.target.dir.value,
        img: e.target.img.value
      }
    };

    fetch(`http://localhost:8000/provider/${this.props.providerId}/edit`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.success) {
        this.notify('Proveedor editado!');
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
        <Redirect to={`/provider/${this.props.providerId}`}/>
      ) : (
        <div>
          <div className='backButton'>
            <Link to={`/provider/${this.props.providerId}`}>
              <i className='fa fa-arrow-left fa-3x' />
            </Link>
          </div>
          <div className='form'>
            <h2>Editar Proveedor</h2>
            <div className='fluidForm'>
            <div className='imgInputUpload'>
              <div
                className='avatar'
                style={{backgroundImage: `url(${this.state.img})`}}></div>
              <input
                type='file'
                onChange={this.imgUpload}/>
            </div>

            <form onSubmit={this.edit}>
              <div className='formGroup'>
                <label>Nombre/Razón Social</label>
                <input
                  name='name'
                  type='text'
                  placeholder='Campo obligatorio'
                  className='formControl'
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
                  placeholder='Campo obligatorio'
                  className='formControl'
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

              <div className='formGroup'>
                <label>CUIL/CUIT</label>
                <input
                  name='cuit'
                  type='number'
                  placeholder='Campo obligatorio (Sólo números)'
                  className='formControl full'
                  value={this.state.cuit}
                  onChange={this.inputChange}/>
                {
                  this.state.err_cuit ? (
                    <small className='formText'>
                      {this.state.err_cuit}
                    </small>
                  ) : null
                }
              </div>

              <div className='formGroup'>
                <label>IVA</label>
                <select
                  style={{color: this.state.iva === '' ? '#6f6f6f' : '#000'}}
                  name='iva'
                  className='formControl full'
                  value={this.state.iva}
                  onChange={this.inputChange}>
                  <option selected disabled value="">Seleccionar una opción</option>
                  <option style={{color: '#111'}} value="Responsable Inscripto">Responsable Inscripto</option>
                  <option style={{color: '#111'}} value="Monotributista">Monotributista</option>
                  <option style={{color: '#111'}} value="Consumidor Final">Consumidor Final</option>
                </select>
              </div>

              <div className='formGroup'>
                <label>Teléfono</label>
                <input
                  name='tel'
                  type='number'
                  className='formControl full'
                  placeholder='Sólo números'
                  value={this.state.tel}
                  onChange={this.inputChange}/>
              </div>

              <div className='formGroup'>
                <label>Dirección</label>
                <input
                  name='dir'
                  type='text'
                  className='formControl full'
                  placeholder='Ej: Av. Pueyrredon 747, Buenos Aires, Argentina.'
                  value={this.state.dir}
                  onChange={this.inputChange}/>
              </div>

              <div className='none'>
                <label>Img</label>
                <input
                  name='img'
                  type='text'
                  value={this.state.img}
                  readOnly/>
              </div>

              <div className='formFooterButtons'>
                <button className='btn'>Editar</button>
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