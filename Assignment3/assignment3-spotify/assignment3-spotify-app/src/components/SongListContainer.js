import React, { Component } from 'react';
import { searchForSong } from '../Utility/SpotifyApi'

import SongList from './SongList';

class SongListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  spotifySearch = async (query) => {
    if (query.length >= 3) {
      const { tracks } = await searchForSong(query, this.props.token);
      this.setState({
        error: tracks.items.length > 0 ? null : `No tracks found for ${query}.`
      });
      this.props.updateSongs(tracks.items);
    } else {
      this.setState({
        error: `Invalid Query:${query}`
      });
      this.props.updateSongs([]);
    }
  }

  componentDidMount = async props => {
    const { searchQuery } = this.props;
    if (searchQuery) {
      await this.spotifySearch(searchQuery);
    }
  };

  componentWillReceiveProps = async newProps => {
    const { searchQuery } = this.props;
    const newSong = newProps.searchQuery;
    if (newSong && newSong !== searchQuery) {
      await this.spotifySearch(newSong);
    }
  };

  render() {
    if (!this.props.searchQuery) {
      return [];
    }

    const songs = [...this.props.songList]; 

    return <SongList songList={songs} />;
  }
}

export default SongListContainer;
