// Express requirements
import path from 'path';
import fs from 'fs';

// React requirements
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from "../App";
import Index from "../components/Index/Index";
import initRedux from "../shared/init-redux";
// import Helmet from 'react-helmet';
// import { Provider } from 'react-redux';
// import { StaticRouter } from 'react-router';
// import { Frontload, frontloadServerRender } from 'react-frontload';
// import Loadable from 'react-loadable';

// Our store, entrypoint, and manifest
// import createStore from '../src/store';
// import App from '../src/app/app';
// import manifest from '../build/asset-manifest.json';

// Some optional Redux functions related to user authentication
// import { setCurrentUser, logoutUser } from '../src/modules/auth';

// LOADER
export default (req, res) => {

    // add redux
    const store = initRedux();
    console.log("STORE---", store)
    //prefetch some data

    const html = renderToString(<App />);
    res.send(renderToString(<Index html={html}/>));
}