import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props: any) => (
	<ContentLoader
		className='pizza-block'
		speed={2}
		width={600}
		height={500}
		viewBox='0 0 600 500'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}
	>
		<circle cx='139' cy='153' r='123' />
		<rect x='0' y='297' rx='10' ry='10' width='280' height='25' />
		<rect x='0' y='345' rx='10' ry='10' width='280' height='88' />
		<rect x='0' y='460' rx='10' ry='10' width='95' height='30' />
		<rect x='125' y='450' rx='25' ry='25' width='152' height='45' />
	</ContentLoader>
);

export default Skeleton;
