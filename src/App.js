import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config'
import { onRouteChange } from './shared/sharedRoutes';
import './App.css';

class App extends React.Component {

    render() {
        return (
            <div>
                <div className="app-header ui fixed inverted menu">
                    <h1 className="header item">All Things Westies</h1>
                    <Link to="/products" className="item">Products</Link>
                    <Link to="/cart" className="item">Cart</Link>
                    <Link to="/profile" className="item">Profile</Link>
                </div>
                <div style={{marginTop: '100px'}}
                     className="app-content ui main text container">
                    {
                        renderRoutes(
                            this.props.route.routes,
                            { history: this.props.history }
                        )
                    }                </div>
            </div>
        );
    }
}

export default onRouteChange(App);
