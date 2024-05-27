import React, { useState, useEffect, useRef } from 'react';
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
import { setItems } from '../redux/pizza/pizzaSlice';

import { SortPropertyEnum } from '../redux/filter/types';

interface IHomeProps {
	searchValue: string;
}

const Home: React.FC<IHomeProps> = ({ searchValue }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const categoryId = useSelector((state: any) => state.filter.categoryId);
	const sortType = useSelector((state: any) => state.filter.sort.sortProperty);
	const currentPage = useSelector((state: any) => state.filter.currentPage);
	const items = useSelector((state: any) => state.pizza.items);

	// console.log(categoryId);

	//const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const onChangeCurrentPage = (i: number) => {
		dispatch(setCurrentPage(i));
	};

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id));
	};

	const fetchPizzas = async () => {
		setIsLoading(true);
		const search = searchValue ? `&search=${searchValue}` : '';

		try {
			const { data } = await axios.get(
				`https://660adfa5ccda4cbc75dbf990.mockapi.io/pizzas?page=${currentPage}&limit=8&${
					categoryId > 0 ? `category=${categoryId}` : ``
				}&sortBy=${sortType}&order=desc${search}`
			);
			dispatch(setItems(data));
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			alert('Ошибка при получении данных');
			console.error('error', error);
		}

		window.scrollTo(0, 0);
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
				isSearch.current = true;
			}
		}
	});

	useEffect(() => {
		if (!isSearch.current) {
			fetchPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sortType, searchValue, currentPage]);

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sortType.sortProperty,
				categoryId,
				currentPage,
			});
			console.log(queryString);
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
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
