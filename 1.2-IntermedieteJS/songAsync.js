// Example usage
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


async function songsUsingAsyncAwait(songPromise) {
  try {
    // referensi forEach dan Map : // Referensi forEach dan Map : https://parsinta.com/articles/perbedaan-foreach-dan-map-dalam-javascript-wedxhm
    const songs = await songPromise
    songs.forEach((song) => {
      console.log(`Title Song : ${song.title}`)
      console.log(`Artist Name: ${song.artist.map(a => a.name)}`)
      console.log(`Duration Song: ${song.duration}`)
    }); 
  }
  catch (error) {
    console.error(error)
  }
}


songsUsingAsyncAwait(songPromise);