import React from 'react';
import { matchRoutes } from 'react-router-config';
import App from '../App';
import Cart from '../components/Cart/Cart';
import Products from '../components/Products/Products';
import Profile from '../components/Profile/Profile';
import Login from '../components/Login/Login';

const routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: Products
            },
            {
                path: '/cart',
                component: Cart
            },
            {
                path: '/products',
                component: Products
            },
            {
                path: '/profile',
                component: Profile
            },
            {
                path: '/login',
                component: Login
            }
        ]
    }
]

export function findActions(component) {
    let actions = [];
    if (component.displayName &&
        component.displayName.toLowerCase().indexOf('connect') > -1
    ) {
        let parentComponent = component.WrappedComponent
        const actionsArray = parentComponent.prefetchActions() || parentComponent.wrappedComponent().prefetchActions() || []
        actions.push(actionsArray)
    } else if (component.prefetchActions) {
        actions.push(component.prefetchActions());
    }

    return actions;
}

export function onRouteChange(WrappedComponent) {
    return class getData extends React.Component {
        fetchData(nextProps) {
            const { route, location } = nextProps;
            const { routes } = route;
            const matches = matchRoutes(routes, location.pathname);
            const results = matches.map(({match, route}) => {
                const component = route.component;
                if (component) {
                    return findActions(component);
                }
                return [];
            });

            const actions = results.reduce((flat, toFlatten) => {
                return flat.concat(toFlatten);
            }, []);

            const promises = actions.map((initialAction) => {
                return this.props.dispatch(initialAction());
            });
            Promise.all(promises);
        }

        componentWillReceiveProps(nextProps) {
            this.fetchData(nextProps);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
}

export default routes;
