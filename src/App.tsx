import React from 'react';

import './scss/app.scss';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/UI/PizzaBlock';

import pizzas from './assets/pizzas.json';

console.log(pizzas);

const App: React.FC = () => {
	return (
		<div className='App'>
			<div className='wrapper'>
				<Header />
				<div className='content'>
					<div className='container'>
						<div className='content__top'>
							<Categories />
							<Sort />
						</div>
						<h2 className='content__title'>Все пиццы</h2>
						<div className='content__items'>
							{pizzas.map(obj => (
								<PizzaBlock 
									key={obj.id}
									title={obj.title}
									price={obj.price}
									image={obj.imageUrl}
									sizes={obj.sizes}
									types={obj.types}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
