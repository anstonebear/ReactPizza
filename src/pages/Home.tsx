import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/filter/filterSlice';

import { Categories } from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/UI/PizzaBlock';
import Skeleton from '../components/UI/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { SortPropertyEnum } from '../redux/filter/types';

interface IHomeProps {
	searchValue: string;
}

const Home: React.FC<IHomeProps> = ({ searchValue }) => {
	const dispatch = useDispatch();
	const categoryId = useSelector((state: any) => state.filter.categoryId);
	const sortType = useSelector((state: any) => state.filter.sort.sortProperty);

	// console.log(categoryId);

	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id));
	};

	useEffect(() => {
		setIsLoading(true);
		const search = searchValue ? `&search=${searchValue}` : '';

		fetch(
			`https://660adfa5ccda4cbc75dbf990.mockapi.io/pizzas?page=${currentPage}&limit=8&${
				categoryId > 0 ? `category=${categoryId}` : ``
			}&sortBy=${sortType}&order=desc${search}`
		)
			.then(response => {
				return response.json();
			})
			.then(arr => {
				setItems(arr);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);

	// .filter((obj: any) => {
	// 	if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
	// 		return true;
	// 	}
	// 	return false;
	// })

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

			<Pagination onChangePage={(num: number) => setCurrentPage(num)} />
		</div>
	);
};

export default Home;
