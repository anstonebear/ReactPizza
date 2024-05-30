import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface pizzaState {
	items: any[];
	status: string;
}

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzaStatus',
	async (params: any) => {
		const { currentPage, categoryId, sortType, search } = params;
		const { data } = await axios.get(
			`https://660adfa5ccda4cbc75dbf990.mockapi.io/pizzas?page=${currentPage}&limit=8&${
				categoryId > 0 ? `category=${categoryId}` : ``
			}&sortBy=${sortType}&order=desc${search}`
		);
		return data;
	}
);

const initialState: pizzaState = {
	items: [],
	status: 'loading',
};

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, state => {
			state.status = 'LOADING';
			state.items = [];
		});

		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = 'SUCCESS';
		});

		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = 'ERROR';
			state.items = [];
		});
	},
});

export const selectPizzaData = (state: any) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
