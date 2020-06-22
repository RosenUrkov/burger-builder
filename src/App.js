import React, { useEffect, Suspense } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/auth';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const App = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  const anonRoutes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/burger-builder" component={BurgerBuilder} />
      <Route exact path="/" component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  const authRoutes = (
    <Switch>
      <Route path="/checkout" render={props => <Checkout {...props} />} />
      <Route path="/orders" render={props => <Orders {...props} />} />
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/logout" component={Logout} />
      <Route path="/burger-builder" component={BurgerBuilder} />
      <Route exact path="/" component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<p>Loading..</p>}>
            {props.isAuthenticated ? authRoutes : anonRoutes}
          </Suspense>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
