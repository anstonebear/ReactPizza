import React from 'react';

import styles from './index.module.scss';
const Search: React.FC = ({ searchValue, setSearchValue }) => {
	return (
		<div className={styles.root}>
			<input
				value={searchValue}
				onChange={e => setSearchValue(e.target.value)}
				placeholder='Поиск пиццы...'
				type='search'
				className={styles.input}
			/>
		</div>
	);
};

export default Search;
