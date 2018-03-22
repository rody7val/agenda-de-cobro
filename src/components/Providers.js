// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Providers.css';

export default class Counter extends Component {
  constructor(props) {
    super();
    this.state = {
      providers: [],
      err: ''
    }
  }

	componentWillMount() {
    fetch('http://localhost:8000/provider')
      .then((response) => {
        return response.json();
      })
      .then(data => {
      	if (!data.success) {
      		return this.setState({ err: data.err });
      	}
        this.setState({ providers: data.providers });
      });
  }

  render() {

    return (
    <div>
      <div className='backButton'>
        <Link to='/'>
          <i className='fa fa-arrow-left fa-3x' />
        </Link>
      </div>
    {
      this.state.providers ? (
      	<div className='containerList'>
          <h2>Proveedores</h2>
      		<ul>
      			{
      				this.state.providers.map(provider => {
      					return (
      						<li key={provider._id}>
      							<Link to={`/provider/${provider._id}`}>
      								{provider.name}
      							</Link>
      						</li>
      					)
      				})
      			}
      		</ul>
      	</div>
      ) : (
        <div>
          cargando...
        </div>
      )
    }
		<div className='footerButtons'>
    		<Link className='btn' to="/provider/new">
    			<i className="fa fa-plus" />
    		</Link>
    </div>
    </div>
    );
  }
}