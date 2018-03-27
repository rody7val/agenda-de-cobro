// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoBack from '../utils/GoBack'
// import './css/Providers.css';

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
        <h2>Proveedores</h2>
        <div className='fluid'>
        	<ul>
        		{
        			this.state.providers.length > 0 ? this.state.providers.map(provider => {
        				return (
        					<li key={provider._id}>
                    <div className='flex'>
                      <div
                        className='avatarList'
                        style={{backgroundImage: `url(${provider.img})`}}></div>
        						  <Link to={`/provider/${provider._id}`}>
        							 {provider.name}
        						  </Link>
                    </div>
                    <hr/>
        					</li>
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