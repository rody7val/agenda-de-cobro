// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
// import './css/ViewProvider.css';

export default class Counter extends Component<Props> {
  constructor(props) {
    super();
    this.state = {
      client: {},
      ok: false
    }

    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:8000/client/${this.props.clientId}`)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      this.setState({ client: data.client });
    });
  }

  delete = (e) => {
    e.preventDefault()

    fetch(`http://localhost:8000/client/${this.props.clientId}/delete`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.success) {
        this.props.notify('Proveedor borrado!');
        this.setState({ ok: true });
        return false;
      }
    });
  }

  render() {
    return (
      <div>
        {
          this.state.ok ? (
            <Redirect to='/client'/>
          ) : (
            <div>
              <div className='backButton'>
                <Link to='/client'>
                  <i className='fa fa-arrow-left fa-3x' />
                </Link>
                <small>{this.state.err}</small>
              </div>
              <div className='alert'>
                <h2>
                  <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Borrar {this.state.client.name} ?
                </h2>
                <br/>
                <div className='deleteButtons'>
                  <form onSubmit={this.delete}>
                    <button className='btn'>
                      <i>si</i>
                    </button>
                  </form>
                  <Link className='btn' to={`/client/${this.props.clientId}`}>
                    <i>no</i>
                  </Link>
                </div>
            	</div>
            </div>
          )
        }
      </div>
    );
  }
}