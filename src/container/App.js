import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import UserSignupPage from '../pages/UserSignupPage';
import LanguageSelector from '../components/LanguageSelector';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import UserPage from '../pages/UserPage';
import TopBar from '../components/TopBar';
// import { Authentication } from "../shared/AuthenticationContext";
import { connect } from 'react-redux';


class App extends React.Component {

  // static contextType = Authentication;


  render() {
    const { isLoggedIn } = this.props; // destructring

    return (
      <div>
        <Router>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && <Route path="/login" component={LoginPage} />}
            <Route path="/signup" component={UserSignupPage} />
            <Route path="/user/:username" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
        <LanguageSelector />
      </div >
    );
  }
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn
  };
};


export default connect(mapStateToProps)(App);
