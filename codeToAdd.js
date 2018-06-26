
// App initial route - middleware:



import {renderToString} from "react-dom/server";

let html;
try {
    html = renderToString(<App/>);
} catch (e) {
    console.log(e)
}
res.send(renderToString(<Index html={html}/>));
};

//App initial step (React route)
import React from "react";

<h1 className="header item">All Things Westies</h1>
<a href="/products" className="item">Products</a>
<a href="/cart" className="item">Cart</a>
<a href="/profile" className="item">Profile</a>


//To add redux



// static loadData(params, store, request = {}) {
//     return [
//         parseUserAgent.bind(null, request.headers),
//         storeUserId.bind(null, request.headers)
//     ];
// }

//To add react router - in app
<h1 className="header item">All Things Westies</h1>
<Link to="/products" className="item">Products</Link>
<Link to="/cart" className="item">Cart</Link>
<Link to="/profile" className="item">Profile</Link>


<div>My first component</div>
{
    React.Children.map(
        this.props.children,
        (child) => {
            return React.cloneElement(
                child,
                { router: this.props.router }
            );
        }
    )
}


//advanced stuff - adding a banner

<Banner show>
    <h3>Check out the semi-annual sale! Up to 75% off select Items</h3>
</Banner>