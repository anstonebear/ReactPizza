import React from 'react';
import { createRoot } from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Routes,
	Link,
} from 'react-router-dom';

import './scss/app.scss';

import Header from './components/UI/Header';
import FullPizza from './pages/FullPizza';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
	const [searchValue, setSearchValue] = React.useState('');

	return (
		<div className='App'>
			<div className='wrapper'>
				<Header
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					items={0}
					totalPrice={0}
				/>
				<div className='content'>
					<div className='container'>
						<Routes>
							<Route path='/' element={<Home searchValue={searchValue} />} />
							<Route path='/cart' element={<Cart />} />
							<Route path='/pizza/:id' element={<FullPizza />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
