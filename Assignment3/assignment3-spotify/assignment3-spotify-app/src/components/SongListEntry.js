
import React, { Component } from "react";

class SongListEntry extends Component {

  checkSong = preview => {
    if (preview) { 
      return <iframe src={`https://open.spotify.com/embed?uri=${preview}`} title="song" width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      
    }
    return <div>No preview available</div>
  }

  render() {
    const { song } = this.props
    return (
      <div className="card  bg-light col-xs-12 col-sm-12 col-md-4 col-lg-3">
        {song.album.images ? <img className="card-img-top" src={song.album.images[0].url} alt={`${song.album.name} Album Cover`} /> : <div>No Image Available</div>}
        <div className="card-body">
          <p className="card-title">{song.name}</p> 
            <p> 
              <a href={song.artists[0].external_urls.spotify}>Artist: {song.artists[0].name}</a>
            </p>
            <p>
              <a href={song.album.external_urls.spotify}>Album: {song.album.name}</a>
            </p>
            <p>Popularity: {song.popularity}</p>
            <p>{this.checkSong(song.uri)}</p> 
        </div>
      </div>
    );
  }
}

export default SongListEntry;
