import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import happyImage from '../../images/giphy.gif';
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push('/shipment');
  };

  const removeProduct = productKey => {
    console.log('Click Remove Button', productKey);
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    // Cart
    const savedCard = getDatabaseCart();
    const productKeys = Object.keys(savedCard);

    fetch('https://floating-oasis-75423.herokuapp.com/productByKeys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productKeys),
    })
      .then(res => res.json())
      .then(data => setCart(data));

    // const cartProducts = productKeys.map((key) => {
    //   const product = fakeData.find((pd) => pd.key === key);
    //   product.quantity = savedCard[key];
    //   return product;
    // });
    // setCart(cartProducts);
  }, []);

  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={happyImage} alt='' />;
  }
  return (
    <div className='twin-container'>
      <div className='product-container'>
        {cart.map(pd => (
          <ReviewItem
            removeProduct={removeProduct}
            key={pd.key}
            product={pd}
          ></ReviewItem>
        ))}
        {thankYou}
      </div>
      <div className='cart-container'>
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className='main-button'>
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
