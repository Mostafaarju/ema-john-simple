import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetail = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch('https://floating-oasis-75423.herokuapp.com/product/' + productKey)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [productKey]);
  // const product = fakeData.find((pd) => pd.key === productKey);
  console.log(product);
  return (
    <div>
      <h1>Your Product Details {productKey}</h1>
      <Product showAddToCard={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
