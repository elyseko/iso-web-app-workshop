import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import productActions from '../../shared/products-action-creators.js';
import searchActions from '../../shared/search-action-creators.js';
import Item from '../Item/Item';
import Search from '../Search/Search';

class ProductList extends React.Component {
  static prefetchActions(params) {
    return [
      productActions.getProductsByCategory.bind(null, params.category)
    ];
  }

  renderItems() {
    const itemsArray = [];
    if (this.props.items) {
      const queryRegExp = new RegExp(this.props.query || '', 'gi');
      this.props.items.forEach((item, index) => {
        if (
          !this.props.query ||
          this.props.query.length === 0 ||
          item.name.search(queryRegExp) > -1 ||
          item.description.search(queryRegExp) > -1 ||
          item.details.search(queryRegExp) > -1
        ) {
          itemsArray.push(
            <Link href={`/product/detail/${item.id}`} key={`${item.name}${index}`}>
              <Item {...item} />
            </Link>
          );
        }
      });
    }
    return itemsArray;
  }


  // make the div its own component
  render() {
    return (
      <div className="product-list">
        <Search {...this.props} />
        <div className="ui segment divided middle items">
          {this.renderItems()}
        </div>
      </div>
    );
  }

}

ProductList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
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
  const { currentCategory } = state.products;
  let items;
  if (currentCategory) items = currentCategory.products;
  const { query } = state.search;
  return {
    items,
    query
  };
}

function mapDispatchToProps(dispatch) {
  return {
    productActions: bindActionCreators(productActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
