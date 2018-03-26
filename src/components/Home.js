// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      entity: {}
    }
  }

  getEntityCount = (url) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        if (data.count == 0) {
          const options = {
            method: 'POST',
            body: JSON.stringify({
              entity: {
                name: 'Mi Empresa',
                email: 'nombre@empresa.com',
                cuit: '12345678910',
                img: 'img/default-entity.png'
              }
            }),
            headers: { "Content-Type": "application/json" }
          };
          this.createNewEntity('http://localhost:8000/entity/new', options);
        } else {
          this.getEntity('http://localhost:8000/entity');
        }
      });
  }

  createNewEntity = (url, options) => {
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        if (data.success) {
          this.setState({
            entity: data.entity
          });
        }
      });
  }

  getEntity = (url) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        if (data.success) {
          console.log(data.entitys[0])
          this.setState({ entity: data.entitys[0] });
          console.log(this.state.entity)
        }
      });
  }

  componentWillMount() {
    this.getEntityCount('http://localhost:8000/entity/count');
  }


  render() {
    return (
      <div>
        <div className="container">
          <h2>Agenda de cobros</h2>
          <Link to="/provider">Proveedores</Link>
        </div>
        <div className='containerEntity'>
          <Link to={`/entity/${this.state.entity._id}`}>
            <div
              className='avatar avatarHome'
              style={{backgroundImage: `url(${this.state.entity.img})`}}>
            </div>
            <p>{this.state.entity.name}</p>
          </Link>
        </div>
      </div>
    );
  }
}