import React, { Component } from 'react'
import CardAlbum from '../components/album/index.js'
import SearchBar from '../components/SearchBar';
import config from '../lib/config';

export default class Home extends Component {
  state = {
    accessToken: '',
    isAuthorize: false,
    tracks: [],
  }

  getHashParams() {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e = r.exec(q);

    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  componentDidMount() {
    const params = this.getHashParams();
    const { access_token: accessToken } = params;

    this.setState({ accessToken, isAuthorize: accessToken !== undefined })
  }

  getSpotifyLinkAuthorize() {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  }

  onSuccessSearch(tracks) {
    this.setState({ tracks });
  }

  render() {
    return (
      <>
        {!this.state.isAuthorize && (
          <main className="center">
            <p>Login for next step...</p>
            <a href={this.getSpotifyLinkAuthorize()} ><button>Authorize</button></a>
          </main>
        )}

        {this.state.isAuthorize && (
          <main className="container" id="home">
            <SearchBar
              accessToken={this.state.accessToken}
              onSuccess={(tracks) => this.onSuccessSearch(tracks)}
            />

            <div className="content">
              {this.state.tracks.length === 0 && (
                <p>No tracks</p>
              )}

              <div className="cards">
                {this.state.tracks.map((song) => (
                  <CardAlbum
                    key={song.id}
                    url_image={song.album.images[0].url}
                    title={song.name}
                    artist={song.artists[0].name}
                    url_spotify={song.album.artists[0].external_urls.spotify}
                  />
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
                ))}
              </div>
            </div>
          </main>
        )}
      </>
    );
  }
}