import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { CartEmpty } from '../CartEmpty';

test('CartEmpty', () => {
	render(
		<BrowserRouter>
			<CartEmpty />
		</BrowserRouter>
	);
	const link = screen.getByText('Вернуться назад');
	userEvent.click(link);
	expect(link).toBeInTheDocument();
});
