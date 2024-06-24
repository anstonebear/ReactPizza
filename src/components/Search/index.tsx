import React, { useCallback, useRef, useState } from 'react';

import styles from './index.module.scss';
import debounce from 'lodash.debounce';

interface ISearchProps {
	setSearchValue: (value: string) => void;
}

export const Search: React.FC<ISearchProps> = ({ setSearchValue }) => {
	const [value, setValue] = useState('');

	const updateSearchValue = useCallback(
		debounce((str: string) => {
			setSearchValue(str);
		}, 1000),
		[setSearchValue]
	);

	const onChangeInput = (e: any) => {
		setValue(e.target.value);
		updateSearchValue(e.target.value);
	};

	return (
		<div className={styles.root}>
			<input
				value={value}
				onChange={onChangeInput}
				placeholder='Поиск пиццы...'
				type='search'
				className={styles.input}
			/>
		</div>
	);
};

export default Search;
