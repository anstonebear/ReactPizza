import React from 'react';

import styles from './index.module.scss';

console.log(styles);

const NotFoundBlock: React.FC = () => {
	return (
		<div className={styles.root}>
			<span className={styles.not_found_txt}>404 Not Found</span>
		</div>
	);
};

export default NotFoundBlock;
