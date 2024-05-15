import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/filter/filterSlice';

import { Categories } from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/UI/PizzaBlock';
import Skeleton from '../components/UI/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { sortList } from '../components/Sort';

import { SortPropertyEnum } from '../redux/filter/types';

interface IHomeProps {
	searchValue: string;
}

const Home: React.FC<IHomeProps> = ({ searchValue }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const categoryId = useSelector((state: any) => state.filter.categoryId);
	const sortType = useSelector((state: any) => state.filter.sort.sortProperty);
	const currentPage = useSelector((state: any) => state.filter.currentPage);

	// console.log(categoryId);

	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const onChangeCurrentPage = (i: number) => {
		dispatch(setCurrentPage(i));
	};

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id));
	};

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find(
				obj => obj.sortProperty === params?.sortProperty
			); // Add a conditional check here

			if (params && sort) {
				// Add a conditional check here
				dispatch(
					setFilters({
						...params,
						sort,
					})
				);
			}
		}
	});

	useEffect(() => {
		setIsLoading(true);
		const search = searchValue ? `&search=${searchValue}` : '';

		axios
			.get(
				`https://660adfa5ccda4cbc75dbf990.mockapi.io/pizzas?page=${currentPage}&limit=8&${
					categoryId > 0 ? `category=${categoryId}` : ``
				}&sortBy=${sortType}&order=desc${search}`
			)
			.then(res => {
				setItems(res.data);
				setIsLoading(false);
			});

		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);

	useEffect(() => {
		const queryString = qs.stringify({
			sortProperty: sortType.sortProperty,
			categoryId,
			currentPage,
		});
		console.log(queryString);
		navigate(`?${queryString}`);
	}, [categoryId, sortType, searchValue, currentPage]);

	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<div>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			{/* <h2 className='content__title'>Все пиццы</h2> */}
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>

			<Pagination onChangePage={(num: number) => onChangeCurrentPage(num)} />
		</div>
	);
};

export default Home;
