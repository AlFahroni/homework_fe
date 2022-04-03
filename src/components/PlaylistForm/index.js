// import React from "react";

// const FormPlaylist = ({onSubmit}) => {
//     return(
//         <form action="" onSubmit={onSubmit}>
//             <h1>Create Playlist</h1>
//             <label htmlFor="name">Title</label>
//             <input 
//                 className="search-input" 
//                 type="text" 
//                 name="title" 
//                 id="name"
//                 placeholder="title"
//                 minLength={10}
//             />
//             <label htmlFor="description">Description</label>
//             <textarea
//                 className="desc-bar"
//                 type="text"
//                 name="description"
//                 id="desc"
//                 placeholder="description"
//             />
//             <button type='submit'>Create a Playlist</button>
//         </form>
//     )
// }

// export default FormPlaylist;

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchApi';
import Input from '../Input';
import InputGroup from '../InputGroup';

export default function PlaylistForm({ accessToken, userId, uriTracks }) {
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
    //   try {
    //     const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
    //       name: form.title,
    //       description: form.description,
    //     });

    //     await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);

    //     toast.success('Playlist created successfully');

    //     setForm({ title: '', description: '' });
    //   } catch (error) {
    //     toast.error(error);
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
          toast.error(error);
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
            />
          </InputGroup>

          <div className="form-playlist__action">
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}