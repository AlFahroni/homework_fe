import './App.css';
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
    </div>
  );
}

export default App;
