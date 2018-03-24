// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Providers.css';

export default class Counter extends Component {
  constructor(props) {
    super();
    this.state = {
      providers: []
    }
  }

	componentDidMount() {
    fetch('http://localhost:8000/provider')
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
      <div className='backButton'>
        <Link to='/'>
          <i className='fa fa-arrow-left fa-3x' />
        </Link>
      </div>

      <div className='containerList'>
        <h2>Proveedores</h2>
      	<ul>
      		{
      			this.state.providers.map(provider => {
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
      			})
      		}
      	</ul>
      </div>
      
		  <div className='footerButtons'>
      		<Link className='btn' to="/provider/new">
      			<i className="fa fa-plus" />
      		</Link>
      </div>
    </div>
    );
  }
}