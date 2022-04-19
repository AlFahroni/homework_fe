import {render, screen, cleanup} from '@testing-library/react';
import SearchBar from '.index';
import {Provider} from 'react-redux';
import store from '../../../store';
import userEvent from '@testing-library/user-event';


const setup = () => render(
    <Provider store={store}>
        <SearchBar/>
    </Provider>
)

describe("Search Bar Test", () => {
    beforeEach(setup)
    afterEach(cleanup);
})

it("Success", () => {
    const searchInput = screen.getByTestId("search-input");
    const buttonSearch =  screen.getByTestId("search-button");

    expect(searchInput).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
});

it("Can Type in search track", () => {
    const searchInput = screen.getByTestId('search-input');
    const buttonSearch = screen.getByTestId('search-button');

    userEvent.type(searchInput, 'test');

    expect(searchInput).toHaveValue('test');
    expect(buttonSearch).not.toBeDisabled();
})