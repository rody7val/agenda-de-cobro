// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoBack from '../utils/GoBack'
import './css/Providers.css';

export default class Providers extends Component {
  constructor(props) {
    super();
    this.state = {
      providers: [],
      load: "cargando..."
    }
  }

	componentWillMount() {
    fetch('http://localhost:8000/provider')
      .then((response) => {
        return response.json();
      })
      .then(data => {
        if (data.success) {
          if (data.providers.length > 0) {
            this.setState({ providers: data.providers });
          } else {
            this.setState({ load: 'No hay proveedores' });
          }
        }
      });
  }

  render() {

    return (
    <div>
      <GoBack href='/' />
      
      <div className='footerButtons'>
          <Link className='btn' to="/provider/new">
            <i className="fa fa-plus" />
          </Link>
      </div>

      <div className='content list'>
        <h2 style={{marginBottom: '35px'}}>Proveedores</h2>
          <ul>
            <li className='li-header widthList'>
              <div className='flex'>
                <b className='_ center'>#</b>
                <b className='name'>Nombre</b>
              </div>
            </li>

            <div className='fluid'>
        		{
        			this.state.providers.length > 0 ? this.state.providers.map(provider => {
        				return (
                  <div key={provider._id}>
                    <li>
                    	<Link className='li-hover' to={`/provider/${provider._id}`}>
                        <div className='flex'>
                          <div
                            className='avatarList'
                            style={{backgroundImage: `url(${provider.img})`, marginLeft: '10px'}}></div>
                    	  	<p style={{marginLeft: '10px'}} >{provider.name}</p>
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
        </div>
          </ul>
      </div>
    </div>
    );
  }
}