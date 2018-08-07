import React, { Component } from 'react';
import SearchForm from './SearchForm';
import SongListContainer from './SongListContainer';
import '../App.css' ;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token:"",
      song: "", 
      songList: []
    };
  }

  onSearch = (searchQuery) => {
    this.setState({
      song: searchQuery
    });
  };

  updateSongs = songList => {
    this.setState({ songList });
  }

  componentDidMount() {

	  let hashParams = {};
	  let e, r = /([^&;=]+)=?([^&;]*)/g,
	    q = window.location.hash.substring(1);
	  while ( e = r.exec(q)) {
	    hashParams[e[1]] = decodeURIComponent(e[2]);
	  }
  
	  if(!hashParams.access_token) {
      console.log("Token : "+ hashParams.access_token);
	    window.location.href = 'https://accounts.spotify.com/authorize?client_id=b0bd6051c7c54d8db67e5b62a9a76408&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
	  } else {
      this.setState({access_token: hashParams.access_token});
      console.log("Token : "+ hashParams.access_token);
	  }
  };
  
  render() {
    const { access_token, song, songList } = this.state;
    if (!access_token) {
      return (
        <div className="App">
          <div className="container">
            Loading...
          </div>
        </div>
      )
    }

    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <SearchForm
                onSearch={this.onSearch} />
            </div>
          </div>
          <div className="container-fluid">
            <SongListContainer token={access_token} 
              searchQuery={song} updateSongs={this.updateSongs} songList={songList} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
