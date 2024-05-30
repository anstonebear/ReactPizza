import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = React.useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					'https://660adfa5ccda4cbc75dbf990.mockapi.io/pizzas/' + id
				);
				setPizza(data);
			} catch (error) {
				alert('ошибка при получении пиццы');
				navigate('/');
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) {
		return <>Загрузка...</>;
	}

	return (
		<div>
			<img src={pizza.imageUrl} alt='pizza art' />
			<h2>{pizza.title}</h2>
			<p>description</p>
			<h4>{pizza.price}</h4>
			<h4>250</h4>
		</div>
	);
};

export default FullPizza;
