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
import Grid from '@mui/material/Grid';

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);
  const isAuthorize = useSelector((state) => state.auth.isAuthorize);
  const dispatch = useDispatch();

  useDocumentTitle('Home - Spotipy');

  useEffect(() => {
    const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');

    if (accessTokenParams !== null) {
      const setUserProfile = async () => {
        try {
          const responseUser = await getUserProfile(accessTokenParams);

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
        setTracks(selectedTracks);
      }
  }, [selectedTracksUri, selectedTracks, isInSearch]);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  }
  
  const onSuccessSearch = (searchTracks) => {
    setIsInSearch(true);
    const selectedSearchTracks = searchTracks.filter((track) => selectedTracksUri.includes(track.uri));

    setTracks([...new Set([...selectedSearchTracks, ...searchTracks])])
  }

  const clearSearch = () => {
    
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

        <PlaylistForm uriTracks={selectedTracksUri} />
        <hr />

        {isAuthorize && (
          <main className="container" id="home">
            <SearchBar
              onSuccess={onSuccessSearch}
              onClearSearch={clearSearch}
            />

            <div className="content">
              {tracks.length === 0 && (
                <p>No tracks</p>
              )}

              <div className="cards">
                <Grid container>
                  {tracks.map((track) => (
                    <Track
                      key={track.id}
                      url_image={track.album.images[0].url}
                      title={track.name}
                      artist={track.artists[0].name}
                      select={selectedTracksUri.includes(track.uri)}
                      toggleSelect={() => toggleSelect(track)}
                    />

                  ))}
                </Grid>
              </div>
            </div>
          </main>
        )}
      </>
    );
}
