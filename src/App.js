import React, {Fragment, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/profile-form/EditProfile';
// Redux 
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
  <Provider store = {store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component= {Landing} />
        <section className='container'> 
        <Alert />
          <Switch>
            <Route exact path='/register' component= {Register} />
            <Route exact path='/login' component= {Login} />
            <PrivateRoute exact path='/dashboard' component= {Dashboard} />
            <PrivateRoute exact path='/create-Profile' component= {CreateProfile} />
            <PrivateRoute exact path='/edit-Profile' component= {EditProfile} />
          </Switch>
          </section>
      </Fragment>
    </Router>
  </Provider>
)
}

export default App;
