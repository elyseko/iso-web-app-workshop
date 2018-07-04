// Code based on: https://gist.github.com/cereallarceny/ee1b86227aabaf4a4b2a3144b84dfaa2
// Express requirements
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import fs from 'fs';

// Our loader - this basically acts as the entry point for each page load
import handleReactRoute from './middleware/handleReactRoute';

// Create our express app using the port optionally specified
const app = express();
const PORT = process.env.PORT || 3003;


// Compress, parse, log, and raid the cookie jar
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());

// Set up homepage, static assets, and capture everything else
app.use(express.static(path.resolve(__dirname, '../public/')));

// routes

// API routes for fetching local data
// Date is loaded into memory, all updates will be wiped out upon server restart!
let cartItems;

app.get('/api/user/cart', (req, res) => {
    fs.readFile('./data/cart.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send;
        }
        return res.send(cartItems || JSON.parse(data));
    });
});

app.post('/api/user/cart/add', (req, res) => {
    fs.readFile('./data/cart.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send;
        }
        const cart = cartItems || JSON.parse(data);
        cartItems = {
            items: [
                ...cart.items,
                req.body
            ]
        };
        return res.send('SUCCESS!');
    });
});

app.get('/api/product/:id', (req, res) => {
    fs.readFile('./data/products.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send;
        }
        const products = JSON.parse(data);
        const product = products.find((item) => {
            return item.id === req.params.id;
        });
        return res.send(product);
    });
});

app.get('/api/products', (req, res) => {
    fs.readFile('./data/products.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send;
        }
        return res.send(JSON.parse(data));
    });
});


app.get('/api/products/categories', (req, res) => {
    fs.readFile('./data/product-categories.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send;
        }
        return res.send(JSON.parse(data));
    });
});

app.get('/api/products/:category', (req, res) => {
    fs.readFile('./data/products.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send;
        }

        const products = JSON.parse(data);
        return fs.readFile('./data/product-category-join.json', 'utf8', (err2, data2) => {
            if (err2) {
                return res.status(404).send;
            }
            const categories = JSON.parse(data2);
            const category = categories.find((item) => {
                return item.id === req.params.category;
            });
            const hydratedProducts = [];

            if (category && category.products) {
                category.products.forEach((productId) => {
                    const details = products.find((product) => {
                        return product.id === productId;
                    });
                    hydratedProducts.push(details);
                });
                const newCategory = {
                    ...category,
                    products: hydratedProducts
                };
                return res.send(newCategory);
            } else {
                res.status(404).send({error: "oh no!", message: "not a valid category"});
            }

        });
    });
});

app.get('/*', (req, res) => {
    res.send('The route is working.')
})

app.listen(PORT, console.log(`App listening on port ${PORT}!`));

// Handle the bugs somehow
app.on('error', error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});