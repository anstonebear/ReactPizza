import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/filter/filterSlice';

import { Categories } from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/UI/PizzaBlock';
import Skeleton from '../components/UI/PizzaBlock/Skeleton';
import { SortPropertyEnum } from '../redux/filter/types';

const Home: React.FC = () => {
	const categoryId = useSelector((state: any) => state.filter.categoryId);
	const dispatch = useDispatch();

	// console.log(categoryId);

	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: SortPropertyEnum.RATING_DESC,
	});

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id));
		// console.log('ONCHENGECATEGORYBLYAT', setCategoryId(id));
		// console.log('IDCATEGORY', id);
	};
	// console.log('idcategory', categoryId);
	// console.log('setCategoryId', setCategoryId);

	console.log('sortType', sortType);

	useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://660adfa5ccda4cbc75dbf990.mockapi.io/pizzas?${
				categoryId > 0 ? `category=${categoryId}` : ``
			}&sortBy=${sortType.sortProperty}&order=desc`
		)
			.then(response => {
				return response.json();
			})
			.then(arr => {
				setItems(arr);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType]);

	return (
		<div>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort value={sortType} onChangeSort={i => setSortType(i)} />
			</div>
			{/* <h2 className='content__title'>Все пиццы</h2> */}
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
		</div>
	);
};

export default Home;
