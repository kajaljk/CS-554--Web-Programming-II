import React, { Component } from "react";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      orderByPop: false
    };
  }

  onSearchQueryChange = e => {
    this.setState({
      searchQuery: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery) {
      this.props.onSearch(this.state.searchQuery, this.state.orderByPop);
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
      <h1> Spotify Search</h1>
        <div className="form-group"> 
        <label htmlFor="songName">Enter Text</label>
          <input
            type="text"
            value={this.state.searchQuery}
            onChange={this.onSearchQueryChange}
            className="form-control"
            id="songName"
            placeholder="Search for a song here!"
          /> 
        </div> 
        <button type="submit" className="btn btn-primary">
          Search for song
        </button>
      </form>
    );
  }
}

export default SearchForm;
