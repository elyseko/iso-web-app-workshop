// React requirements
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from "../App";
import Index from "../components/Index/Index";
import initRedux from "../shared/init-redux";
import { Provider } from 'react-redux';
import Products from "../components/Products/Products";

export default handleReactRoute(req, res) => {

    // add redux
    const store = initRedux();
    // console.log("STORE---", store)
    //prefetch some data

    const promises = Products.prefetchActions().map((initialAction) => {
        return store.dispatch(initialAction());
    });

    Promise.all(promises).then(() => {
        const serverState = store.getState();
        const stringifiedServerState = JSON.stringify(serverState);

        const html = renderToString(<Provider store={store}>
            <App />
        </Provider>);
        res.send(renderToString(<Index html={html} state={stringifiedServerState}/>));
    }).catch(e => {
        console.log(e)
    });
