import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import { Provider } from 'mobx-react';
import { history } from './history';
import createMobxStores from './stores/createMobxStores';

// Pages
import EmailTemplate from './containers/EmailTemplate';
import EmailTemplateList from './containers/EmailTemplateList';

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/css/style.css';

const FourOhFour = () => <h1>404</h1>;
const stores = createMobxStores();

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Provider {...stores}>
          <div className="container">
            <Switch>
              <Route exact path="/template/:id" component={EmailTemplate} />
              <Route exact path="/" component={EmailTemplateList} />
              <Route component={FourOhFour} />
            </Switch>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
