import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route} from 'react-router-dom'

import HomePage from './components/Home';

//Provider
import ProvidersPage from './components/provider/Providers';
import ViewProvidersPage from './components/provider/ViewProvider';
import NewProviderPage from './components/provider/NewProvider';
import EditProvidersPage from './components/provider/EditProvider';
import DeleteProvidersPage from './components/provider/DeleteProvider';

//Client
// import ClientsPage from './components/client/Clients';
// import ViewClientPage from './components/client/ViewClient';
// import NewClientPage from './components/client/NewClient';
// import EditClientPage from './components/client/EditClient';
// import DeleteClientPage from './components/client/DeleteClient'

//Entitie
import ViewEntityPage from './components/entity/ViewEntity';
import EditEntityPage from './components/entity/EditEntity';

//Pago
import PagosPage from './components/pago/Pagos';
import NewPagoPage from './components/pago/NewPago';
import ViewPagoPage from './components/pago/ViewPago';
import EditPagoPage from './components/pago/EditPago';


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

            <Route exact path="/pago" component={PagosPage} />
            <Route exact path="/pago/new" render={() => (
              <NewPagoPage
                notify={this.notify}/>
            )} />
            <Route exact path="/pago/:id" render={({match}) => (
              <ViewPagoPage
                pagoId={match.params.id}/>
            )} />
            <Route exact path='/pago/:id/edit' render={({match}) => (
              <EditPagoPage 
                notify={this.notify}
                pagoId={match.params.id}/>
            )} />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;


            // <Route exact path="/client" component={ClientsPage} />
            // <Route exact path="/client/new" render={() => (
            //   <NewClientPage
            //     notify={this.notify}/>
            // )} />
            // <Route exact path="/client/:id" render={({match}) => (
            //   <ViewClientPage
            //     clientId={match.params.id}/>
            // )} />
            // <Route exact path="/client/:id/edit" render={({match}) => (
            //   <EditClientPage
            //     notify={this.notify}
            //     clientId={match.params.id}/>
            // )} />
            // <Route exact path="/client/:id/delete" render={({match}) => (
            //   <DeleteClientPage
            //     notify={this.notify}
            //     clientId={match.params.id}/>
            // )} />