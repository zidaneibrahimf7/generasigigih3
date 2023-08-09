import { useState, useEffect } from 'react';

// Refrensi : https://www.shecodes.io/athena/26887-how-to-get-api-from-spotify-and-show-a-song-in-react-js
const accessToken = 'BQD9jKaOsIbYmIidYqSnoTJO2l2x4UEqBGq8XwNNC7nWq_R2NNvDncFC8YXhhYrpk251r8GAM2cwR4oa-fUOwWuiS4MQPNxATFZX3MILM4y0h3VidYuvW_-axKLcAicbCL0H20upJ_aS6HC-O9yx1pUPxCXchqwdHEt2VItU_Oc4MJ17ZLByO-5OveZzI-bDvWk7KCVsW9n44n9WCCLKEldWgJP0xQYYg0sM1TEI0FEeo1SEuBKsDb6txwlUM505TKzH_wNGCXVjEhxmnSE6'

const Song = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null)

  useEffect(() => {
    // Function to fetch search results from Spotify API
    const searchSpotify = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
          {
            headers: {
              'Content-Type': "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setSearchResults(data.tracks.items);
      } catch (error) {
        console.error('Error searching songs:', error);
      }
    };

    if (accessToken && searchQuery) {
      searchSpotify();
    }
  }, [accessToken, searchQuery]);

  // Function to handle play button click
  const handlePlay = (track) => {
    if (currentTrack === track.id) {
      setCurrentTrack(null);
    } else {
      setCurrentTrack(track.id);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a song..."
      />
      <button onClick={() => setSelectedSong(searchResults[0])}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Play</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((track) => (
            <tr key={track.id}>
              <td>{track.name}</td>
              <td>{track.artists.map((artist) => artist.name).join(', ')}</td>
              <td>
                <button onClick={() => handlePlay(track)}>
                  {currentTrack === track.id ? 'Pause' : 'Play'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedSong && (
        <div>
          <h2>Selected Song</h2>
          <p>Title: {selectedSong.name}</p>
          <p>Artist: {selectedSong.artists.map((artist) => artist.name).join(', ')}</p>
          <audio controls autoPlay>
            <source src={selectedSong.preview_url} />
          </audio>
        </div>
      )}
    </div>
  );
};


export default Song;
