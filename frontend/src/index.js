import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";

import "react-toastify/dist/ReactToastify.css";
import './index.css';

// pages for this product
const Home = React.lazy(() => import('./views/home'))
const Farms = React.lazy(() => import('./views/farms'))
const Pools = React.lazy(() => import('./views/pools'))
const Exchange = React.lazy(() => import('./views/exchange/exchange'))
const Liquidity = React.lazy(() => import('./views/liquidity/liquidity'))
const Terms = React.lazy(() => import('./views/terms'))
const Faq = React.lazy(() => import('./views/faq'))
const Policy = React.lazy(() => import('./views/policy'))
const Contact = React.lazy(() => import('./views/contact'))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <ToastContainer />
      <Suspense fallback={<></>}>
        <Switch>
          <Route path="/liquidity" component={Liquidity} />
          <Route path="/exchange" component={Exchange} />
          <Route path="/pools" component={Pools} />
          <Route path="/farms" component={Farms} />
          <Route path="/home" component={Home} />
          <Route path="/terms" component={Terms} />
          <Route path="/policy" component={Policy} />
          <Route path="/faq" component={Faq} />
          <Route path="/contact" component={Contact} />
          <Route exact path="/*" component={Home}>
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
