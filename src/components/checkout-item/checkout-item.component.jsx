import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CheckoutItemContainer, ImageContainer, Img, Name, Quantity, Price, Arrow, Value, RemoveButton } from './checkout-item.styles.jsx'

const CheckoutItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, decrementItemFromCart, removeItemFromCart } = useContext(CartContext);

  const incrementQuantityHandler = () => addItemToCart(cartItem);
  const decrementQuantityHandler = () => decrementItemFromCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

  return(
    <CheckoutItemContainer>
      <ImageContainer>
        <Img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
          <Arrow onClick={decrementQuantityHandler}>&#10094;</Arrow>
          <Value className='value'>{quantity}</Value>
          <Arrow onClick={incrementQuantityHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>${price}</Price>
      <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;