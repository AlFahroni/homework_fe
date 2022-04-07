import './App.css';
// import data from './data/sample.js'
// import {ImageAlbum, DescAlbum, NameAlbum, ButtonLink} from './components/album/index.js'
// import Home from './pages/Home';
import CreatePlaylist from './pages/CreatePlaylist';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import GuardRoute from './components/GuardRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <GuardRoute path="/create-playlist" type="private" exact>
              <CreatePlaylist />
            </GuardRoute>
            <GuardRoute path="/" type="guest" exact>
              <Auth />
            </GuardRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      {/* <ImageAlbum src={data.album.images[0].url}>
        <DescAlbum name={data.name} />
      </ImageAlbum>

      <NameAlbum name={data.album.name} artist={data.artists[0].name}>
        <ButtonLink url={data.album.artists[0].external_urls.spotify}/>
      </NameAlbum> */}

      {/* <Home /> */}
    </div>
  );
}

export default App;
