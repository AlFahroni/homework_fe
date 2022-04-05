import React, { useEffect, useState } from 'react'
import Track from '../components/album/index.js'
import SearchBar from '../components/SearchBar';
import config from '../lib/config';
import PlaylistForm from '../components/PlaylistForm/index.js';
import { getUserProfile } from '../lib/fetchApi';
import { toast } from 'react-toastify';
import { useDocumentTitle } from '../lib/customHooks';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slice/authSlice';

export default function Home() {
  // const [accessToken, setAccessToken] = useState('');
  // const [isAuthorize, setIsAuthorize] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);
  const isAuthorize = useSelector((state) => state.auth.isAuthorize);
  const dispatch = useDispatch();

  useDocumentTitle('Home - Spotipy');
  // const [user, setUser] = useState({});

  useEffect(() => {
    // const access_token = new URLSearchParams(window.location.hash).get('#access_token');
    const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');

    // setAccessToken(access_token);
    // setIsAuthorize(access_token !== null);
    if (accessTokenParams !== null) {
      // setAccessToken(accessTokenParams);
      // // setIsAuthorize(accessTokenParams !== null);
      // setIsAuthorize(true);

      const setUserProfile = async () => {
        try {
          const responseUser = await getUserProfile(accessTokenParams);

          // setUser(response);
          dispatch(login({
            accessToken: accessTokenParams,
            user: responseUser
          }));
        } catch (e) {
          toast.error(e);
        }
      }

      setUserProfile();
    }
  },)
  
  useEffect(() => {
      if (!isInSearch) {
        // const selectedTracks = filterSelectedTracks();

        setTracks(selectedTracks);
      }
    // }, [selectedTracksUri]);
  }, [selectedTracksUri, selectedTracks, isInSearch]);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  }

  // const filterSelectedTracks = () => {
  //   return tracks.filter((track) => selectedTracksUri.includes(track.uri));
  // }
  
  const onSuccessSearch = (searchTracks) => {
    setIsInSearch(true);
    // const selectedTracks = filterSelectedTracks();
    // const searchDistincTracks = searchTracks.filter(track => !selectedTracksUri.includes(track.uri));

    // setTracks([...selectedTracks, ...searchDistincTracks]);
    const selectedSearchTracks = searchTracks.filter((track) => selectedTracksUri.includes(track.uri));

    setTracks([...new Set([...selectedSearchTracks, ...searchTracks])])
  }

  const clearSearch = () => {
    // const selectedTracks = filterSelectedTracks();
    
    setTracks(selectedTracks);
    setIsInSearch(false);
  }

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter(item => item !== uri));
      setSelectedTracks(selectedTracks.filter((item) => item.uri !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  }

    return (
      <>
        {!isAuthorize && (
          <main className="center">
            <p>Login for next step...</p>
            <a href={getSpotifyLinkAuthorize()}><button>Authorize</button></a>
          </main>
        )}

        {/* <PlaylistForm
            accessToken={accessToken}
            userId={user.id}
            uriTracks={selectedTracksUri}
          /> */}

        <PlaylistForm uriTracks={selectedTracksUri} />
        <hr />

        {isAuthorize && (
          <main className="container" id="home">
            <SearchBar
              // accessToken={accessToken}
              // onSuccess={(tracks) => onSuccessSearch(tracks)}
              onSuccess={onSuccessSearch}
              onClearSearch={clearSearch}
            />

            <div className="content">
              {tracks.length === 0 && (
                <p>No tracks</p>
              )}

              <div className="cards">
                {tracks.map((track) => (
                  <Track
                    key={track.id}
                    url_image={track.album.images[0].url}
                    title={track.name}
                    artist={track.artists[0].name}
                    // url_spotify={song.album.artists[0].external_urls.spotify}
                    select={selectedTracksUri.includes(track.uri)}
                    toggleSelect={() => toggleSelect(track)}
                  />

                ))}
              </div>
            </div>
          </main>
        )}
      </>
    );
}

// export default class Home extends Component {
  // state = {
  //   accessToken: '',
  //   isAuthorize: false,
  //   tracks: [],
  // }

      // const params = getHashParams();
    // const {access_token} = params;

      // getHashParams() {
  //   const hashParams = {};
  //   const r = /([^&;=]+)=?([^&;]*)/g;
  //   const q = window.location.hash.substring(1);
  //   let e = r.exec(q);

  //   while (e) {
  //     hashParams[e[1]] = decodeURIComponent(e[2]);
  //     e = r.exec(q);
  //   }
  //   return hashParams;
  // }

  
  // componentDidMount() {
  //   const params = this.getHashParams();
  //   const { access_token: accessToken } = params;

  //   this.setState({ accessToken, isAuthorize: accessToken !== null })
  // }

  // getSpotifyLinkAuthorize() {
  //   const state = Date.now().toString();
  //   const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

  //   return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  // }

                    // return(
                  //   <div>
                  //  <ImageAlbum src={song.album.images[0].url}>
                  //     <DescAlbum name={song.name} />
                  //   </ImageAlbum>

                  //   <NameAlbum name={song.album.name} artist={song.artists[0].name}>
                  //     <ButtonLink url={song.album.artists[0].external_urls.spotify}/>
                  //   </NameAlbum> 
                  //   </div>
                  // )