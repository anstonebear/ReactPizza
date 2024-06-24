import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Search from './index';

describe('Search', () => {
	test('Search', () => {
		const setSearchValueMock = jest.fn();
		render(
			<BrowserRouter>
				<Search setSearchValue={setSearchValueMock} />
			</BrowserRouter>
		);
		const input = screen.getByPlaceholderText(/Поиск пиццы.../i);
		userEvent.click(input);
		expect(input).toBeInTheDocument();
		expect(input).toMatchSnapshot();
		console.log(input);
	});

	test('onChange', () => {
		const input = document.createElement('input');
		const onChangeInput = jest.fn();

		// Call the onChangeInput function with a mock event
		input.onchange = onChangeInput;
		input.dispatchEvent(new Event('change'));

		expect(onChangeInput).toHaveBeenCalled();
	});
});
