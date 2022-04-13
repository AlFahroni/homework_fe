import React, {useState} from 'react';
import './index.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function Track ({url_image, title, artist, select, toggleSelect}) {
  const [isSelected, setIsSelected] = useState(select);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }

  return (
    <Grid item lg={6} md={6} sm={12} xs={12}>
      <div className="card-album">
        <div className='card-wrapper'>
          <div className="copy-music">
            <div className='card-content'>
            <img className="card-image" src={url_image} alt="{title}" />
            <div className='card-info'>
              <p className='song-title'>{title}</p>
              <p className='song-artist'>{artist}</p>
              <Button variant="contained" color="primary" className='button-search' onClick={handleToggleSelect}>{isSelected ? 'Deselect' : 'Select'}</Button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  )
}