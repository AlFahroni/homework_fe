import './App.css';
import data from './data/sample.js'

function App() {
  return (
    <div className="App">
      <div>
        <img src={data.album.images[0].url} width="600" height="600" />
      </div>
      <div>
        <h1>{data.name}</h1>
        <h2>{data.album.name}</h2>
        <h5>{data.artists[0].name}</h5>
        <a href={data.album.artists[0].external_urls.spotify} target="_blank"><button>select</button></a>
      </div>
    </div>
  );
}

export default App;
