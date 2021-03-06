import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, BrowserRouter } from 'react-router-dom';
import BaseContainer from '../shared/BaseContainer';
import getCookieValue from '../../utils/getCookieValue';
import getGeneratedRoutes from '../../config/routes';
import { AppContainer } from './elements';
import * as duck from './duck';
import Header from '../shared/Header';

const mapStateToProps = state => ({
  pending: duck.selectors.pending(state),
  userName: duck.selectors.userName(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(duck.actions, dispatch);

const checkCookieOrGoAuth = async checkFN => {
  if (window.location.href.includes('auth')) return;

  if (getCookieValue('auth-token')) {
    const result = await checkFN();
    if (!result) {
      document.cookie = 'auth-token=0; max-age=-1';
      window.location.href = '/auth';
    } else if (window.location.pathname === '/') {
      window.location.href = '/main';
    }
  } else {
    window.location.href = '/auth';
  }
}

class App extends React.Component {
  componentDidMount() {
    checkCookieOrGoAuth(this.props.isLoggedIn);
    this.checkInterval = window.setInterval(() => {
      checkCookieOrGoAuth(this.props.isLoggedIn);
    }, 60000);
  };

  componentWillUnmount() {
    window.clearInterval(this.checkInterval);
  }

  render() {
    return (
      <AppContainer>
        <BaseContainer fullWidth>
          <Header userName = {this.props.userName}/>
          <BaseContainer>
            <BrowserRouter>
              <Switch>{ getGeneratedRoutes() }</Switch>
            </BrowserRouter>
          </BaseContainer>
        </BaseContainer>
      </AppContainer>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);