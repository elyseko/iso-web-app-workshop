import React from 'react';
import Products from "./components/Products/Products";

import './App.css';

class App extends React.Component {

    render() {
        return (
            <div>
                <div className="app-header ui fixed inverted menu">
                    <h1 className="header item">All Things Westies</h1>
                    <a href="/products" className="item">Products</a>
                    <a href="/cart" className="item">Cart</a>
                    <a href="/profile" className="item">Profile</a>
                </div>
                <div style={{marginTop: '100px'}}
                     className="app-content ui main text container">
                    <Products />
                </div>
            </div>
        );
    }
}

export default App;
