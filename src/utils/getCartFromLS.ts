import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
	const cartData = localStorage.getItem('cart');
	const cartItems = cartData ? JSON.parse(cartData) : [];
	const totalPrice = calcTotalPrice(cartItems);

	return {
		items: cartItems,
		totalPrice: totalPrice,
	};
};
