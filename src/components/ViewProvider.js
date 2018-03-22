// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/ViewProvider.css';

export default class Counter extends Component<Props> {
  constructor(props) {
    super();
    this.state = {
      provider: {}
    }
  }

	componentWillMount() {
    fetch(`http://localhost:8000/provider/${this.props.providerId}`)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      this.setState({ provider: data.provider });
    });
  }

  render() {

    return (
    <div>
      <div className='backButton'>
        <Link to='/provider'>
          <i className='fa fa-arrow-left fa-3x' />
        </Link>
    	  <small>{this.state.err}</small>
      </div>
    	<div className='containerView'>
    		<h2>{this.state.provider.name}</h2>
    		<p>{this.state.provider.email}</p>
    	</div>
      <div className='footerButtons'>
        <Link className='btn' to={`/provider/${this.props.providerId}/edit`}>
          <i>Editar</i>
        </Link>
        <Link className='btn' to="/provider/new">
          <i>Borrar</i>
        </Link>
      </div>
    </div>
    );
  }
}