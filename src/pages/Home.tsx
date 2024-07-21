import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import {
	selectFilter,
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
import {
	setItems,
	fetchPizzas,
	selectPizzaData,
} from '../redux/pizza/pizzaSlice';

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
	const { items, status } = useSelector(selectPizzaData);

	// console.log(categoryId);

	//const [items, setItems] = useState([]);

	const onChangeCurrentPage = (i: number) => {
		dispatch(setCurrentPage(i));
	};

	const onChangeCategory = useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);

	const getPizzas = async () => {
		const search = searchValue ? `&search=${searchValue}` : '';

		await dispatch(
			fetchPizzas({
				currentPage,
				categoryId,
				sortType,
				search,
			}) as unknown as any
		);

		window.scrollTo(0, 0);
	};

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find(
				obj => obj.sortProperty === params?.sortProperty
			);

			if (params && sort) {
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
			getPizzas();
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

			<div className='content__items'>
				{status === 'error' ? (
					<div className='content__error-info'>
						<h2>Произошла ошибка 😕</h2>
						<p>
							К сожалению, не удалось получить питсы. Попробуйте повторить
							попытку позже.
						</p>
					</div>
				) : (
					<div className='content__items'>
						{status === 'loading' ? skeletons : pizzas}
					</div>
				)}
			</div>

			<Pagination onChangePage={(num: number) => onChangeCurrentPage(num)} />
		</div>
	);
};

export default Home;
