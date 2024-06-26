import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface filterState {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: {
		name: string;
		sortProperty: string;
	};
}

const initialState: filterState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: { name: 'популярности', sortProperty: 'rating' },
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		setSearchValue(state, action) {
			state.searchValue = action.payload;
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		setFilters(state, action) {
			state.currentPage = Number(action.payload.currentPage);
			state.categoryId = Number(action.payload.categoryId);
			state.sort = action.payload.sort;
		},
	},
});

export const selectFilter = (state: any) => state.filter;
export const selectSort = (state: any) => state.filter.sort;

// Action creators are generated for each case reducer function
export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
