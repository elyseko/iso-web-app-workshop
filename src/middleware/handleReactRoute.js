// React requirements
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from "../App";
import Index from "../components/Index/Index";
import initRedux from "../shared/init-redux";
import { Provider } from 'react-redux';
import Products from "../components/Products/Products";

export default (req, res) => {}