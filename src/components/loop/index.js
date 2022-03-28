import data from '../../data/tracks.js'

const TracksAlbum = ({ name, album, images, song, artist}) => (
    <div>
        <h1>{name}</h1>
        <h3>{album}</h3>
        <img src={images} alt={name}/>
        <p>{song}</p>
        <p>{artist}</p>
    </div>
);

const TracksLoop = () => {
    return(
        <div className='tracks-wrapper'>
            {data.map((data, idx) => {
                const {
                    album: {
                        images: [{url:src}],
                        name,
                    },
                    artists: [{ name:artist}],
                    name: song,
                } = data;

                return(
                    <TracksAlbum
                        key={idx}
                        album={name}
                        images={src}
                        song={song}
                        artist={artist}
                    />
                );
            })};
        </div>
    );
};

export default TracksLoop;