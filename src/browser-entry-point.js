import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import initRedux from './shared/init-redux.js';
import sharedRoutes from './shared/sharedRoutes';
import App from "./App";

console.log('The browser code got loaded!!!')