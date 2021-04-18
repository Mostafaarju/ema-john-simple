import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { product, handleAddProduct } = props;
  const { img, name, seller, price, stock, key } = product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className="product-name">
          <Link to={"/product/" + key}>{name}</Link>
        </h4>
        <p>
          <small>by: {seller}</small>
        </p>
        <p>${price}</p>
        <p>
          <small>Only {stock} left in stock - order soon</small>
        </p>
        {props.showAddToCard && (
          <button
            className="main-button"
            onClick={() => handleAddProduct(product)}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> add to card
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
