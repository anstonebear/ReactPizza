import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

export interface cartState {
	// categoryId: number;
	totalPrice: number;

	items: any[];
}

const { items, totalPrice } = getCartFromLS();

const initialState: cartState = {
	totalPrice: totalPrice,

	items: items,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			const findItem = state.items.find(obj => obj.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}
			state.totalPrice = calcTotalPrice(state.items);
		},

		minusItem(state, action) {
			const findItem = state.items.find(obj => obj.id === action.payload);

			if (findItem) {
				findItem.count--;
			}
		},
		removeItem(state, action) {
			state.items = state.items.filter(obj => obj.id !== action.payload.id);
		},
		clearItem(state, action) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const selectCart = (state: any) => state.cart;
export const selectCartItem = (id: number) => (state: any) =>
	state.cart.items.find((obj: any) => obj.id === id);

// Action creators are generated for each case reducer function
export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
