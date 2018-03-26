import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route} from 'react-router-dom'

import HomePage from './components/Home';

//Provider
import ProvidersPage from './components/provider/Providers';
import ViewProvidersPage from './components/provider/ViewProvider';
import NewProviderPage from './components/provider/NewProvider';
import EditProvidersPage from './components/provider/EditProvider';
import DeleteProvidersPage from './components/provider/DeleteProvider';

//Entities
import ViewEntityPage from './components/entity/ViewEntity';
import EditEntityPage from './components/entity/EditEntity';

import './App.css';

class App extends Component {
  constructor(props) {
    super()
    this.notify = this.notify.bind(this)
  }

  notify = (msj) => {
    if (!("Notification" in window)) {
      alert(msj)
    }
    else if (Notification.permission === "granted") {
      new Notification(msj)
    }
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          new Notification(msj)
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />

            <Route exact path="/provider" component={ProvidersPage} />
            <Route exact path="/provider/new" render={() => (
              <NewProviderPage
                notify={this.notify}/>
            )} />
            <Route exact path="/provider/:id" render={({match}) => (
              <ViewProvidersPage
                providerId={match.params.id}/>
            )} />
            <Route exact path="/provider/:id/edit" render={({match}) => (
              <EditProvidersPage
                notify={this.notify}
                providerId={match.params.id}/>
            )} />
            <Route exact path="/provider/:id/delete" render={({match}) => (
              <DeleteProvidersPage
                notify={this.notify}
                providerId={match.params.id}/>
            )} />

            <Route exact path="/entity/:id" render={({match}) => (
              <ViewEntityPage
                entityId={match.params.id}/>
            )} />
            <Route exact path="/entity/:id/edit" render={({match}) => (
              <EditEntityPage
                notify={this.notify}
                entityId={match.params.id}/>
            )} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
