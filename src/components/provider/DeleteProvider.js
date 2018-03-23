// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import './css/ViewProvider.css';

export default class Counter extends Component<Props> {
  constructor(props) {
    super();
    this.state = {
      provider: {},
      ok: false
    }

    this.delete = this.delete.bind(this);
    this.notify = this.notify.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:8000/provider/${this.props.providerId}`)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      this.setState({ provider: data.provider });
    });
  }

  delete = (e) => {
    e.preventDefault()

    fetch(`http://localhost:8000/provider/${this.props.providerId}/delete`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.success) {
        this.notify('Proveedor borrado!');
        this.setState({ ok: true });
        return false;
      }
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

  render() {
    return (
      <div>
        {
          this.state.ok ? (
            <Redirect to='/provider'/>
          ) : (
            <div>
              <div className='backButton'>
                <Link to='/provider'>
                  <i className='fa fa-arrow-left fa-3x' />
                </Link>
                <small>{this.state.err}</small>
              </div>
              <div className='alert'>
                <h2>
                  <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Borrar {this.state.provider.name} ?
                </h2>
                <br/>
                <div className='deleteButtons'>
                  <form onSubmit={this.delete}>
                    <button className='btn'>
                      <i>si</i>
                    </button>
                  </form>
                  <Link className='btn' to={`/provider/${this.props.providerId}`}>
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