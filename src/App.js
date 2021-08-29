import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';
import AuthLayout from "./layouts/AuthLayout"

// Views 
import Home from './views/Home';
import Blog from './views/Blog';
import AboutUs from './views/AboutUs';
import ContactUs from './views/ContactUs';
import SignUp from './views/SignUp';
import Login from './views/Login';
import TermsOfService from './views/TermsOfService';
import PrivacyPolicy from './views/PrivacyPolicy';
import UserInfo from './views/UserInfo';

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute exact path='/blog' component={Blog}
          layout={LayoutDefault}/>
          <AppRoute exact path="/about" component={AboutUs} layout={LayoutDefault}/>
          <AppRoute exact path="/contact" component={ContactUs} layout={LayoutDefault}/>
          <AppRoute exact path="/login" component={Login} layout={LayoutDefault}/>
          <AppRoute exact path="/register" component={SignUp} layout={LayoutDefault}/>
          <AppRoute exact path="/tos" component={TermsOfService} layout={LayoutDefault}/>
          <AppRoute exact path="/privacy" component={PrivacyPolicy} layout={LayoutDefault}/>
          <AppRoute exact path="/user/data" component={UserInfo} layout={AuthLayout}/>
        </Switch>
      )} />
  );
}

export default App;