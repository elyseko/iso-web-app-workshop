import React from 'react';

const Index = (props) => {
    return (
        <html>
            <head>
                <title>All Things Westies</title>
                <link rel="stylesheet" type="text/css" href="semantic-ui-css/semantic.css" />
            </head>
            <body>
                <div
                    id="react-content"
                    dangerouslySetInnerHTML={{ __html: props.html }}
                />
                <script src="http://localhost:3000/static/js/bundle.js"></script>
            </body>
        </html>
    )
}

export default Index;