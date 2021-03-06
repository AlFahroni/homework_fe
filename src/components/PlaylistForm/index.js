import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchApi';
import Input from '../Input';
import InputGroup from '../InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slice/authSlice.ts';
import './index.css';

export default function CreatePlaylistForm({ uriTracks }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const [errorForm, setErrorForm] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrorForm({ ...errorForm, [name]: '' });
  }

  const validateForm = () => {
    let isValid = true;

    if (form.title.length < 10) {
      setErrorForm({
        ...errorForm,
        title: 'Karakter harus lebih dari 10'
      });
      isValid = false;
    }

    if (form.description.length > 100) {
      setErrorForm({
        ...errorForm,
        description: 'Deskripsi minimal terdapat 10 karakter lebih'
      });
      isValid = false;
    }

    return isValid;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
    if (uriTracks.length > 0) {
        try {
          const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
            name: form.title,
            description: form.description,
          });

          await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);

          toast.success('Playlist berhasil dibuat');

          setForm({ title: '', description: '' });
        } catch (error) {
          // toast.error(error);
          if (error.response.status === 401) {
            dispatch(logout());
          } else {
            toast.error(error.message);
          }
        }
      } else {
        toast.error('Pilih lagu terlebih dahulu');
      }
    }
  }

  return (
    <div className="create-playlist-form">
      <div>
        <h2>Create Playlist</h2>

        <form className="form form-playlist" onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              label="Title"
              placeholder="Title of playlist"
              value={form.title}
              id="title-playlist"
              name="title"
              onChange={handleChange}
              error={errorForm.title}
              required
              data-testid="title-playlist"
            />
          </InputGroup>
          <InputGroup>
            <Input
              type='textarea'
              label="Description"
              placeholder="Description of playlist"
              value={form.description}
              id="description-playlist"
              name="description"
              onChange={handleChange}
              required
              error={errorForm.description}
              data-testid="description-playlist"
            />
          </InputGroup>

          <div className="form-playlist__action">
            <button type="submit" data-testid="btn-create-playlist">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
};