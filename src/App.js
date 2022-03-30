import './App.css';
// import data from './data/sample.js'
// import {ImageAlbum, DescAlbum, NameAlbum, ButtonLink} from './components/album/index.js'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      {/* <ImageAlbum src={data.album.images[0].url}>
        <DescAlbum name={data.name} />
      </ImageAlbum>

      <NameAlbum name={data.album.name} artist={data.artists[0].name}>
        <ButtonLink url={data.album.artists[0].external_urls.spotify}/>
      </NameAlbum> */}

      <Home />
    </div>
  );
}

export default App;
