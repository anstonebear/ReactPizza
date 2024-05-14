import React from 'react';

import styles from './index.module.scss';

interface ISearchProps {
	searchValue: string;
	setSearchValue: (value: string) => void;
}

const Search: React.FC<ISearchProps> = ({ searchValue, setSearchValue }) => {
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
