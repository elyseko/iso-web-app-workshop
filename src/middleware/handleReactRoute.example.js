// React requirements
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from "../App";
import Index from "../components/Index/Index";


export default handleReactRoute (req, res) => {
    const html = renderToString(<Provider store={store}>
        <App />
    </Provider>);
    res.send(renderToString(<Index html={html} state={stringifiedServerState}/>));
}