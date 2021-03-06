import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPament/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [shippingData, setShippingData] = useState(null);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const onSubmit = data => {
    setShippingData(data);
  };

  const handlePaymentSuccess = paymentId => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipments: shippingData,
      paymentId,
      orderTime: new Date(),
    };

    fetch('https://floating-oasis-75423.herokuapp.com/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails),
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          // alert('Your Order Placed Successfully');
        }
      });
  };

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    <div className='container'>
      <div className='row'>
        <div
          style={{ display: shippingData ? 'none' : 'block' }}
          className='col-md-6'
        >
          <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
            <input
              defaultValue={loggedInUser.name}
              {...register('name', { required: true })}
              placeholder='Your Name'
            />
            {errors.name && <span className='error'>Name is required</span>}
            <input
              defaultValue={loggedInUser.email}
              {...register('email', { required: true })}
              placeholder='Your Email'
            />
            {errors.email && <span className='error'>Email is required</span>}
            <input
              defaultValue={loggedInUser.address}
              {...register('address', { required: true })}
              placeholder='Your Address'
            />
            {errors.address && (
              <span className='error'>Address is required</span>
            )}
            <input
              {...register('phone', { required: true })}
              placeholder='Your Phone Number'
            />
            {errors.phone && (
              <span className='error'>Phone number is required</span>
            )}
            <input
              {...register('country', { required: true })}
              placeholder='Your Country'
            />
            {errors.country && (
              <span className='error'>Country is required</span>
            )}

            <input type='submit' />
          </form>
        </div>
        <div
          style={{ display: shippingData ? 'block' : 'none' }}
          className='col-md-6'
        >
          <h1>Please Pay for me</h1>
          <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
