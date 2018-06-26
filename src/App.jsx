import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Banner from './components/Banner/Banner';
import Products from './components/Products/Products';
import {
    parseUserAgent,
    storeUserId
} from './shared/app-action-creators.es6';

import './App.css';

class App extends React.Component {

    render() {
        return (
            <div>
                <div className="app-header ui fixed inverted menu">
                    Hello
                </div>
                <div className="app-content ui main text container">
                </div>
            </div>
        );
    }
}

export default App;
