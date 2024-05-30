import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface cartState {
	// categoryId: number;
	totalPrice: number;

	items: any[];
}

const initialState: cartState = {
	totalPrice: 0,

	items: [],
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
			state.totalPrice = state.items.reduce((sum: number, obj: any) => {
				return obj.price * obj.count + sum;
			}, 0);
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
