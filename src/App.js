import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Banner from './components/Banner/Banner';
import {
    parseUserAgent,
    storeUserId
} from './shared/app-action-creators.es6';

class App extends React.Component {

    // static loadData(params, store, request = {}) {
    //     return [
    //         parseUserAgent.bind(null, request.headers),
    //         storeUserId.bind(null, request.headers)
    //     ];
    // }

    render() {
        return (
            <div>Hello
                {/*<div className="ui fixed inverted menu">*/}
                    {/*<h1 className="header item">All Things Westies</h1>*/}
                    {/*/!*<Link to="/products" className="item">Products</Link>*!/*/}
                    {/*/!*<Link to="/cart" className="item">Cart</Link>*!/*/}
                    {/*/!*<Link to="/profile" className="item">Profile</Link>*!/*/}
                {/*</div>*/}
                {/*<Banner show>*/}
                    {/*<h3>Check out the semi-annual sale! Up to 75% off select Items</h3>*/}
                {/*</Banner>*/}
                {/*<div className="ui main text container">*/}

                    {/*/!*<div>My first component</div>*!/*/}
                    {/*/!*{*!/*/}
                        {/*/!*React.Children.map(*!/*/}
                            {/*/!*this.props.children,*!/*/}
                            {/*/!*(child) => {*!/*/}
                                {/*/!*return React.cloneElement(*!/*/}
                                    {/*/!*child,*!/*/}
                                    {/*/!*{ router: this.props.router }*!/*/}
                                {/*/!*);*!/*/}
                            {/*/!*}*!/*/}
                        {/*/!*)*!/*/}
                    {/*/!*}*!/*/}
                {/*</div>*/}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object,
    router: PropTypes.shape({
        push: PropTypes.function
    })
};

export default App;
