// React requirements
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from "../App";
import Index from "../components/Index/Index";


export default (req, res) => {
    const html = renderToString(<App />);
    res.send(renderToString(<Index html={html}/>));
}