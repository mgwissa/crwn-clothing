import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, decrementItemFromCart, removeItemFromCart } = useContext(CartContext);

  const incrementQuantityHandler = () => addItemToCart(cartItem);
  const decrementQuantityHandler = () => decrementItemFromCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

  return(
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className="quantity">
          <div className='arrow' onClick={decrementQuantityHandler}>&#10094;</div>
          <span className='value'>{quantity}</span>
          <div className='arrow' onClick={incrementQuantityHandler}>&#10095;</div>
      </span>
      <div className='price'>${price}</div>
      <div className='remove-button' onClick={removeItemHandler}>&#10005;</div>
    </div>
  )
}

export default CheckoutItem;