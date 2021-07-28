import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import Header from './components/Header';
import UserListScreen from './screens/UserListScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserEditScreen from './screens/UserEditScreen';
import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <>
      <Router>
        <Header />

        <Route path='/' component={HomeScreen} exact />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/home' component={HomeScreen} />
        <Route path='/admin/userlist' component={UserListScreen} />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
      </Router>
    </>
  );
}

export default App;