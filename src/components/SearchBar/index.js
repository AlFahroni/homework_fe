import React, { useState } from 'react';
// import config from '../../lib/config';
import './index.css';
import Input from '../Input';
import { searchTrack } from '../../lib/fetchApi';
import { toast } from 'react-toastify';


export default function SearchBar({ accessToken, onSuccess, onClearSearch }) {
  const [text, setText] = useState('');
  const [isClear, setIsClear] = useState(true);


const handleInput = (e) => {
  setText(e.target.value);
}

const handleSubmit = async (e) => {
  e.preventDefault();

// const requestOptions = {
//   headers: {
//     'Authorization': 'Bearer ' + accessToken,
//     'Content-Type': 'application/json',
//   },
// };

try {
  // const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
  //   .then((data) => data.json());
  const response = await searchTrack(text, accessToken);

  const tracks = response.tracks.items;
  onSuccess(tracks);
  setIsClear(false);
} catch (e) {
  // alert(e);
  toast.error(e);
}
}


const handleClear = () => {
  onClearSearch();
  setText('');
  setIsClear(true);
}

return (
  <div>
    <form className="form-search" onSubmit={handleSubmit}>
      {/* <input */}
      <Input
        type="text"
        placeholder="Search..."
        className="form-search__input"
        required
        value={text}
        onChange={handleInput}
      />
      <button type="submit">Search</button>
    </form>

    {!isClear && (
      <button onClick={handleClear}>Clear search</button>
    )}
  </div>
)
}





   
 





  // import PropTypes from 'prop-types';
// import React, { useEffect, useState } from 'react';

// export default class SearchBar extends Component {
    // state = {
  //   text: '',
  // }

  // async onSubmit(e) {
  //   e.preventDefault();

  //   const { text } = this.state;

  //   var requestOptions = {
  //     headers: {
  //       'Authorization': 'Bearer ' + this.props.accessToken,
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   try {
  //     const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
  //       .then((data) => data.json());

  //     const tracks = response.tracks.items;
  //     this.props.onSuccess(tracks);
  //   } catch (e) {
  //     alert(e);
  //   }

  //   e.target.blur();
  // }