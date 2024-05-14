import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './index.module.scss';

interface IPagination {
	onChangePage: (num: number) => void;
}

const Pagination: React.FC<IPagination> = ({ onChangePage }) => {
	return (
		<div className={styles.pagination}>
			<ReactPaginate
				className={styles.root}
				breakLabel='...'
				nextLabel='>'
				previousLabel='<'
				onPageChange={event => onChangePage(event.selected + 1)}
				pageRangeDisplayed={5}
				pageCount={2}
				renderOnZeroPageCount={null}
			/>
		</div>
	);
};

export default Pagination;
