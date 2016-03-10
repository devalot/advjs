/******************************************************************************/
var ArtistsTable = React.createClass({
  getInitialState: function() {
    return {artists: []};
  },

  componentDidMount: function() {
    $.getJSON('/api/artists', function(data) {
      this.setState({artists: data});
    }.bind(this));
  },

  onArtistClick: function(e) {
    var tr = $(e.target).closest("tr"),
        id = parseInt(tr.attr("data-artist-id")),
        matches = this.state.artists.filter(function(artist) {
          if (artist.id === id) return true;
        });

    if (matches.length === 1) {
      this.props.onArtistSelect(matches[0]);
    }
  },

  render: function() {
    var artists = this.state.artists.map(function(artist) {
      return (
        <tr data-artist-id={artist.id} onClick={this.onArtistClick}>
          <td>{artist.name}</td>
          <td>{artist.formation_year}</td>
          <td><a href={artist.website}>{artist.website}</a></td>
        </tr>
      );
    }.bind(this));

    return (
      <table>
        <thead>
          <tr>
            <th>Artist Name</th>
            <th>Formation Year</th>
            <th>Website</th>
          </tr>
        </thead>

        <tbody>
          {artists}
        </tbody>
      </table>
    );
  }
});

/******************************************************************************/
var AlbumsTable = React.createClass({
  render: function() {
    if (this.props.albums.length === 0) return (<div></div>);

    var albums = this.props.albums.map(function(album) {
      return (
        <tr>
          <td>{album.name}</td>
          <td>{album.released}</td>
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Album Name</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {albums}
        </tbody>
      </table>
    );
  }
});

/******************************************************************************/
var MusicApp = React.createClass({
  getInitialState: function() {
    return {selectedArtist: null, albums: []};
  },

  fetchAlbums: function(artist) {
    var url = "/api/artists/" + artist.id + "/albums";

    $.getJSON(url, function(data) {
      this.setState({selectedArtist: artist, albums: data});
    }.bind(this));
  },

  handleArtistSelected: function(artist) {
    this.fetchAlbums(artist);
  },

  render: function() {
    return (
      <div>
        <ArtistsTable onArtistSelect={this.handleArtistSelected}/>
        <AlbumsTable albums={this.state.albums}/>
      </div>
    );
  }
});

/******************************************************************************/
ReactDOM.render(
  <MusicApp/>,
  document.getElementById('container')
);
