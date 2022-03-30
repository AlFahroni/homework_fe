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

import React from 'react'

export default function CardAlbum({url_image, title, artist, url_spotify}) {
  return (
    <div className="card-album">
        <div className="copy-music">
          <img src={url_image} alt="" />
          <p className='song-title'>{title}</p>
          <p className='song-artist'>{artist}</p>
        </div>
        <a className='btn' href={url_spotify}>Clik on me</a>
    </div>
  )
}

// export {ImageAlbum, DescAlbum, NameAlbum, ButtonLink};