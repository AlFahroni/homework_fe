// const ImageAlbum = ({src, children}) => (
//     <div>
//         <img src={src} width="600" height="600" />
//         {children}
//     </div>
// );

// const DescAlbum = (props) => <h2>Album:{props.name}</h2>;

// const NameAlbum = ({name, artist, children}) => (
//     <div className="NameAlbum">
//         <h5>{name}</h5>
//         <p>{artist}</p>
//         {children}
//     </div>
// );

// const ButtonLink = (urlSpotify) => <a href={url} ><button>select</button></a>;

import React, {useState} from 'react';
import './index.css';

export default function Track ({url_image, title, artist, select, toggleSelect}) {
  const [isSelected, setIsSelected] = useState(select);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }

  return (
    <div className="card-album">
      <div className='card-wrapper'>
        <div className="copy-music">
          <div className='card-content'>
          <img className="card-image" src={url_image} alt="{title}" />
          <p className='song-title'>{title}</p>
          <p className='song-artist'>{artist}</p>
        {/* <a className='btn' href={url_spotify}> */}
          <button className='button-search' onClick={handleToggleSelect}>{isSelected ? 'Deselect' : 'Select'}</button>
          {/* </a> */}
          </div>
        </div>
      </div>
    </div>
  )
}


// export {ImageAlbum, DescAlbum, NameAlbum, ButtonLink};