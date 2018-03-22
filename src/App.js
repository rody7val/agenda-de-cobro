import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/Home';
import CounterPage from './components/Counter';
import NewProviderPage from './components/NewProvider';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/counter" component={CounterPage} />
            <Route path="/provider/new" component={NewProviderPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
