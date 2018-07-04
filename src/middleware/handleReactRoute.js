// React requirements
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';
import Index from "../components/Index/Index";
import initRedux from "../shared/init-redux";
import { Provider } from 'react-redux';
import routes, { findActions } from '../shared/sharedRoutes';

export default (req, res) => {

    // Static Router uses context to pass information about redirects
    const context = {};

    // add redux
    const store = initRedux();
    // console.log("STORE---", store)
    //prefetch some data

    const checkForRoutes = matchRoutes(routes, req.url);

    if (checkForRoutes) {
        const store = initRedux();
        let actions = [];
        checkForRoutes.map(({match, route}) => {
            const component = route.component;
            if (component) {
                actions = findActions(component);
            }
        });
        actions = actions.reduce((flat, toFlatten) => {
            return flat.concat(toFlatten);
        }, []);

        const promises = actions.map((initialAction) => {
            return store.dispatch(initialAction());
        });

        Promise.all(promises).then(() => {
            const serverState = store.getState();
            const stringifiedServerState = JSON.stringify(serverState);

            const html = renderToString(
                    <Provider store={store}>
                        <StaticRouter location={req.url} context={context}>
                            {renderRoutes(routes)}
                        </StaticRouter>
                    </Provider>
            );
            res.send(renderToString(<Index html={html} state={stringifiedServerState}/>));
        }).catch(e => {
            console.log(e)
        });
    } else {
        res.status(404).send("Notfound!!!");
    }


}