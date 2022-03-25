const ImageAlbum = ({src, children}) => (
    <div>
        <img src={src} width="600" height="600" />
        {children}
    </div>
);

const DescAlbum = (props) => <h2>Album:{props.name}</h2>;

const NameAlbum = ({name, artist, children}) => (
    <div className="NameAlbum">
        <h5>{name}</h5>
        <p>{artist}</p>
        {children}
    </div>
);

const ButtonLink = (url) => <a href={url} ><button>select</button></a>;

export {ImageAlbum, DescAlbum, NameAlbum, ButtonLink};