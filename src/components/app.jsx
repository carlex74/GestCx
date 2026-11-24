import React, { useState, useEffect } from 'react';
import { getDevice }  from 'framework7/lite-bundle';
import {
  f7,
  f7ready,
  App,
  View,
} from 'framework7-react';
import cordovaApp from '../js/cordova-app';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import routes from '../js/routes';
import store from '../js/store';
import HomePage from '../pages/home';
import Log from '../pages/Log';
import {AuthProvider} from '../components/context/AuthContext.jsx'
import UserHome from '../pages/UserHome';
import InfoView from '../pages/InfoView';
import LoadingView from './LoadingView';
import ProtectedRouter from './ProtectedRouter';

const MyApp = () => {

  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    name: 'My App', // App name
      theme: 'auto', // Automatic theme detection


      id: 'io.framework7.myapp', // App bundle ID
      // App store
      store: store,

      // Input settings
      input: {
        scrollIntoViewOnFocus: device.cordova && !device.electron,
        scrollIntoViewCentered: device.cordova && !device.electron,
      },
      // Cordova Statusbar settings
      statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
      },
  };

  f7ready(() => {
    // Init cordova APIs (see cordova-app.js)
    if (f7.device.cordova) {
      cordovaApp.init(f7);
    }

    // Call F7 APIs here
  });

  return (
    <App { ...f7params } >

<BrowserRouter>
<AuthProvider>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/login" element={<ProtectedRouter log={true}><Log log={true} /></ProtectedRouter>}/>
      <Route path="/register" element={<ProtectedRouter log={true}><Log/></ProtectedRouter>}/>
      <Route path="/home" element={<ProtectedRouter><LoadingView><UserHome/></LoadingView></ProtectedRouter>}/>
      <Route path="/home/monto:id" element={<ProtectedRouter><InfoView/></ProtectedRouter>}/>
    </Routes>
</AuthProvider>
</BrowserRouter>

    </App>
  );
}
export default MyApp;