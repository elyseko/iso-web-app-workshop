import React from 'react';
import config from '../../config';

const Index = (props) => {
    return (
        <html>
        <head>
            <title>All Things Westies</title>
            <link rel="stylesheet" type="text/css" href="/assets/semantic-ui-css/semantic.css" />
        </head>
        <body>
        <div
            id="react-content"
            dangerouslySetInnerHTML={{ __html: props.html }}
        />
        <script dangerouslySetInnerHTML={{
            __html: `
                    window.__SERIALIZED_STATE__ =
                      JSON.stringify(${props.state})
                  `
        }}
        />
        <script src={`${config.webpackServer}/static/js/bundle.js`}></script>
        </body>
        </html>
    )
}

export default Index;