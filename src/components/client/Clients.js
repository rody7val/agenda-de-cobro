// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoBack from '../utils/GoBack';
// import './css/Providers.css';

export default class Counter extends Component {
  constructor(props) {
    super();
    this.state = {
      clients: [],
      load: "cargando..."
    }
  }

	componentWillMount() {
    fetch('http://localhost:8000/client')
      .then((response) => {
        return response.json();
      })
      .then(data => {
        if (data.success) {
          if (data.clients.length > 0) {
            this.setState({ clients: data.clients });
          } else {
            this.setState({ load: 'No hay clientes' });
          }
        }
      });
  }

  render() {

    return (
    <div>
      <GoBack href='/' />
      
      <div className='footerButtons'>
          <Link className='btn' to="/client/new">
            <i className="fa fa-plus" />
          </Link>
      </div>

      <div className='content list'>
        <h2>Clientes</h2>
        <div className='fluid'>
        	<ul>
        		{
        			this.state.clients.length > 0 ? this.state.clients.map(client => {
        				return (
        					<li key={client._id}>
                    <div className='flex'>
                      <div
                        className='avatarList'
                        style={{backgroundImage: `url(${client.img})`}}></div>
        						  <Link to={`/client/${client._id}`}>
        							 {client.name}
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