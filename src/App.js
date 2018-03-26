import React, { Component } from 'react';
import { HashRouter as Router} from 'react-router-dom'
import { Switch, Route } from 'react-router-dom';

import HomePage from './components/Home';

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
            <Route exact path="/" component={HomePage} />

            <Route exact path="/provider" component={ProvidersPage} />
            <Route exact path="/provider/new" component={NewProviderPage} />
            <Route exact path="/provider/:id" render={({match}) => (
              <ViewProvidersPage providerId={match.params.id}/>
            )} />
            <Route exact path="/provider/:id/edit" render={({match}) => (
              <EditProvidersPage providerId={match.params.id}/>
            )} />
            <Route exact path="/provider/:id/delete" render={({match}) => (
              <DeleteProvidersPage providerId={match.params.id}/>
            )} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
