// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Counter.css';

export default class Counter extends Component {
	constructor(props) {
		super();
    this.state = {
      count: 0
    }

  	this.plus = this.plus.bind(this)
  	this.minus = this.minus.bind(this)
  	this.notify = this.notify.bind(this)
  }


  plus() {
  	this.setState({
  		count: this.state.count + 1
  	})
  }

  minus() {
  	this.setState({
  		count: this.state.count -1
  	})
  }

  notify() {
  	if (!("Notification" in window)) {
  	  alert(this.state.count);
  	}
  	else if (Notification.permission === "granted") {
  	  new Notification(this.state.count);
  	}
  	else if (Notification.permission !== 'denied') {
  	  Notification.requestPermission(function (permission) {
  	    if (permission === "granted") {
  	      new Notification(this.state.count);
  	    }
  	  });
  	}
  }

  render() {

    return (
      <div>
        <div className="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className="counter">
          {this.state.count}
        </div>
        <div className="btnGroup">
          <button className="btn" onClick={this.plus}>
            <i className="fa fa-plus" />
          </button>
          <button className="btn" onClick={this.minus}>
            <i className="fa fa-minus" />
          </button>
          <button className="btn" onClick={this.notify}>notify</button>
        </div>
      </div>
    );
  }
}