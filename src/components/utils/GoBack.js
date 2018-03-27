// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import ReactDOM from 'react-dom';

export default class GoBack extends Component {
  constructor(props) {
    super();
    this.state = {
    	redirect: false
    }

    this.keyPress = this.keyPress.bind(this)
  }

  componentDidMount() {
    document.body.addEventListener("keyup", this.keyPress);
  }

  componentWillUnmount() {
    document.body.removeEventListener("keyup", this.keyPress);
  }

  keyPress = (e) => {
    console.log(e.keyCode);

  	if (e.keyCode === 8) {
  		this.setState({
  			redirect: true
  		});
  	}
  }

  render() {
    return (
      <div className='backButton'>
      	{
      		this.state.redirect ? (
      			<Redirect to={this.props.href} />
      		) : (
        		<Link to={this.props.href}>
          			<i className='fa fa-arrow-left fa-3x' />
        		</Link>
			)
      	}
      </div>
    );
  }
}