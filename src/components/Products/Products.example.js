import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import productActions from '../../shared/products-action-creators.js';
import searchActions from '../../shared/search-action-creators.js';
import Search from '../Search/Search';
import Item from '../Item/Item';

import './Products.css';

class Products extends React.Component {
    static prefetchActions() {
        return [
            productActions.getProductCategories,
            productActions.getProducts
        ];
    }

    constructor(props) {
        super(props);
        this.state = {
            showToolTip: false
        };
    }

    renderProductCategories() {
        const categories = this.props.categories;
        const productCategories = [];
        if (categories) {
            categories.forEach((product, index) => {
                const classes = classnames(product.icon, 'icon');
                let toolTip = null;
                if (
                    this.state.showToolTip &&
                    product.id === 'top-picks'
                ) {
                    toolTip = (
                        <div className="tooltip ui inverted">
                            Not sure where to start? Try top Picks.
                        </div>
                    );
                }
                productCategories.push(
                    <div
                        key={`${product.id}${index}`}
                        className="column segment secondary"
                    >
                        <a className="product-link" href={`/products/${product.id}`}>
                            <i className={classes} />
                            <div className="category-title">{product.name}</div>
                            {toolTip}
                        </a>
                    </div>
                );
            });
        }
        return productCategories;
    }

    renderItems() {
        const allItems = this.props.products;

        const itemsArray = [];
        if (allItems) {
            const queryRegExp = new RegExp(this.props.query || '', 'gi');
            allItems.forEach((item, index) => {
                if (
                    !this.props.query ||
                    this.props.query.length === 0 ||
                    item.name.search(queryRegExp) > -1 ||
                    item.description.search(queryRegExp) > -1 ||
                    item.details.search(queryRegExp) > -1
                ) {
                    itemsArray.push(
                        <Item {...item} key={`${item.name}${index}`} />
                    );
                }
            });
        }
        return itemsArray;
    }

    render() {
        return (
            <div className="products">
                <Search {...this.props} />
                { (!this.props.query || !this.props.query.length) ?
                    <div>
                        <h1 className="ui dividing header">Shop by Category</h1>
                        <div className="ui doubling four column grid">
                            {this.renderProductCategories()}
                        </div>
                    </div>
                    :
                    <div className="ui segment divided middle items">
                        {this.renderItems()}
                    </div>
                }
            </div>
        );
    }
}

Products.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        description: PropTypes.string,
        name: PropTypes.string,
        id: PropTypes.string
    })),
    products: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        details: PropTypes.string,
        id: PropTypes.string,
        price: PropTypes.number,
        thumbnail: PropTypes.string
    })),
    query: PropTypes.string
};

function mapStateToProps(state) {
    const { all, categories } = state.products;
    const { query } = state.search;
    return {
        products: all,
        categories,
        query
    };
}
//
function mapDispatchToProps(dispatch) {
    return {
        productActions: bindActionCreators(productActions, dispatch),
        searchActions: bindActionCreators(searchActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
