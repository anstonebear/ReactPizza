import React, { useState } from 'react';

const Categories: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const onClickCategory = (index: number) => {
		setActiveIndex(index);
	};

	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	];

	return (
		<div>
			<div className='categories'>
				<ul>
					{categories.map((categoryName, index) => (
						<li
							onClick={() => onClickCategory(index)}
							className={activeIndex === index ? 'active' : ''}
						>
							{categoryName}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Categories;