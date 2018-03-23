import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import { Switch, Route } from 'react-router-dom';

import HomePage from './components/Home';
import CounterPage from './components/Counter';

//Provider
import ProvidersPage from './components/provider/Providers';
import NewProviderPage from './components/provider/NewProvider';
import ViewProvidersPage from './components/provider/ViewProvider';
import EditProvidersPage from './components/provider/EditProvider';
import DeleteProvidersPage from './components/provider/DeleteProvider';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={HomePage} />
            <Route path="/counter" component={CounterPage} />

            <Route exact={true} path="/provider" component={ProvidersPage} />
            <Route path="/provider/new" component={NewProviderPage} />
            <Route exact={true} path="/provider/:id" render={({match}) => (
              <ViewProvidersPage providerId={match.params.id}/>
            )} />
            <Route exact={true} path="/provider/:id/edit" render={({match}) => (
              <EditProvidersPage providerId={match.params.id}/>
            )} />
            <Route exact={true} path="/provider/:id/delete" render={({match}) => (
              <DeleteProvidersPage providerId={match.params.id}/>
            )} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
