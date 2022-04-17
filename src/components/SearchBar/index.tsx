import React, { ChangeEventHandler, useState, FormEventHandler } from 'react';
import './index.css';
import Input from '../Input';
import { searchTrack } from '../../lib/fetchApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slice/authSlice';
import axios from 'axios';
import {TRootState} from "../../store";

interface IProps{
  onSuccess: (tracks: any[], text: string) => void;
  onClearSearch: () => void;
}

const SearchBar: React.FC<IProps> = ({ onSuccess, onClearSearch}) => {
  // const accessToken = useSelector((state) => state.auth.accessToken);
  const accessToken = useSelector((state:TRootState) => state.auth.accessToken);
  // const [text, setText] = useState('');
  const [text, setText] = useState<string>('');
  const [isClear, setIsClear] = useState<boolean>(true);
  const dispatch = useDispatch();


// const handleInput = (e) => {
//   setText(e.target.value);
// }

const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
  setText(e.target.value);
}

const handleSubmit: FormEventHandler<HTMLDivElement> & FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();

try {
  const response = await searchTrack(text, accessToken);

  const tracks = response.tracks.items;
  onSuccess(tracks, text);
  setIsClear(false);
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      dispatch(logout(null));
    }
  } else if (error instanceof Error) {
    toast.error(error.message);
  }
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
      <Input
        type="text"
        placeholder="Search..."
        className="form-search__input"
        required
        value={text}
        onChange={handleInput}
      />
      <button className='button-search' type="submit">Search</button>
    </form>

    {!isClear && (
      <button className='button-search' onClick={handleClear}>Clear search</button>
    )}
  </div>
)
}
