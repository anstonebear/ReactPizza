import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/UI/PizzaBlock';
import Skeleton from '../components/UI/PizzaBlock/Skeleton';

const Home: React.FC = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		fetch('https://660adfa5ccda4cbc75dbf990.mockapi.io/pizzas')
			.then(response => {
				return response.json();
			})
			.then(json => {
				setItems(json);
			});
		setIsLoading(false);
	}, []);

	return (
		<div>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
		</div>
	);
};

export default Home;
