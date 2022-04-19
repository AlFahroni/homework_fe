import { render, screen, cleanup } from '@testing-library/react';
import CreatePlaylistForm from './index';
import { Provider } from 'react-redux';
import store from '../../store';
import userEvent from '@testing-library/user-event';

const setup = () => render(
  <Provider store={store}>
    <CreatePlaylistForm />
  </Provider>
);

describe('Form create Test', () => {
  beforeEach(setup)
  afterEach(cleanup);

  it('Success rendered', () => {
    const titleInput = screen.getByTestId('title-playlist');
    const descriptionInput = screen.getByTestId('description-playlist');
    const buttonCreate = screen.getByTestId('btn-create-playlist');

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(buttonCreate).toBeInTheDocument();
  });

  it('Can type in form', () => {
    const titleInput = screen.getByTestId('title-playlist');
    const descriptionInput = screen.getByTestId('description-playlist');

    userEvent.type(titleInput, 'New Playlist');
    userEvent.type(descriptionInput, 'New Playlist Description');

    expect(titleInput).toHaveValue('New Playlist');
    expect(descriptionInput).toHaveValue('New Playlist Description');
  });
});