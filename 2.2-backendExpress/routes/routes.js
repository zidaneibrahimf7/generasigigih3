const express = require('express');
const routerSong = express.Router()
const { v4 } = require('uuid')

// Database Playlist Song
const songPlaylist = [
  {
    "id": "56209feb-ced5-419b-a770-b005f81cb1e4",
    "title": "ZOOM",
    "artist": "Red Velvet",
    "url": "spotify_zoomredvelvet.com",
    "isPlaying" : false
  },
];

// GET songPlaylist to get the database of songPlaylist
routerSong.get('/', (req, res) => {
  res.json(songPlaylist).status(200)
});

// POST songPlaylist to Add songPlaylist
routerSong.post('/', (req, res) => {
  const { title, artist, url, isPlaying} = req.body
  //Condition doesn't add titie / artist / url in database
  if(!title || !artist || !url) {
    return res.status(400).json({error: 'Title, Artist, and URL are required field'})
  }
  // condition if add the same song playlist
  const duplicateSong = songPlaylist.find((song) => {
    song.title === title || song.artist === artist || song.url === url
  })
  if (duplicateSong) {
    return res.status(400).json({error : 'The song has been added before'})
  } 
  // database newSong
  const newSongPlaylist = {
    id: v4(),
    title,
    artist,
    url,
    isPlaying,
  };
  songPlaylist.push(newSongPlaylist)

  res.status(200).json(newSongPlaylist)
});

// GET songPlaylist from ID
routerSong.get('/:id', (req, res) => {
  const { id } = req.params;
  const itemSongPlaylistId = songPlaylist.find((song) => song.id === id);
    console.log(itemSongPlaylistId);

    res.status(200).send(itemSongPlaylistId)
})

let lastPlayedSongId = null;
// POST Method songPlaylist to get play song
routerSong.post('/play/:id', (req, res) => {
  const { title, artist } = req.body;
  const { id } = req.params;

  const songToPlay = songPlaylist.find((song) => song.id === id);
  // condition to make lastPlayed song will be false from true if the other new song from database is played
  if (songToPlay) {
    if(lastPlayedSongId != id)  {
      const lastPlayedSong = songPlaylist.find((song) => song.id === lastPlayedSongId);
      if (lastPlayedSong) {
        lastPlayedSong.isPlaying = false;
      }
      songToPlay.isPlaying = true;
      lastPlayedSong = id;
    } else {
      songToPlay.isPlaying = true
    }
    res.status(200).json({message : `song ${songToPlay.title} from ${songToPlay.artist} is playing successfully`});
  } else {
    res.status(404).json({message : 'song not found'})
  }
})

module.exports = routerSong ;



