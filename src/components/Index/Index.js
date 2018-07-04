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
            </body>
        </html>
    )
}

export default Index;