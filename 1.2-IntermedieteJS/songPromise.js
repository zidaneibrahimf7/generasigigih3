const songPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const songList = [
      {
        title: 'song title 1',
        artist: [{ name: 'artist name 1' }],
        duration: 200
      },
      {
        title: 'song title 2',
        artist: [{ name: 'artist name 2' }],
        duration: 200
      }
    ];
    resolve(songList)
  }, 2000)
});

function songsUsingPromise(songPromise) {
  songPromise
    .then(() => {
      return songPromise
    })
    .then((songs) => {
      // Show song from songPromise
      // Referensi forEach dan Map : https://parsinta.com/articles/perbedaan-foreach-dan-map-dalam-javascript-wedxhm
      songs.forEach((song) => { //forEach for get all object from songList
        console.log(`Title Song : ${song.title}`)
        console.log(`Artist Name: ${song.artist.map(a => a.name)}`) //using map to get object inside artist object 
        console.log(`Duration Time: ${song.duration} seconds`)
      })
    })
    .catch((error) => {
      console.log('Error:', error)
    })
}

songsUsingPromise(songPromise);