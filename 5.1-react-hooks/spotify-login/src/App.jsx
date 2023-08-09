import { useEffect, useState } from 'react';
import queryString from 'query-string'
import './App.css'
import Song from './components/Song';

// Referensi : https://www.npmjs.com/package/query-string
// Referensi : https://www.youtube.com/watch?v=wBq3HCvYfUg;
function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const params = queryString.parse(window.location.hash);
    const token = params.access_token;

    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleLogin = () => {
    const clientId = "986b4d6d6f17416ab416b7be94cf1ac2";
    const redirectUri = "http://localhost:5173/";
    const scopes = "playlist-modify-private";

    const authEndpoint = '...';
    const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`;

    window.location = loginUrl
  }
  return (
    <div>
      <header>
        <h1>Spotify Clone API Zidane</h1>
      </header>
      <main>
        {accessToken ? (
          <p><Song /></p>
        ) : (
          <button onClick={(handleLogin)}> Login with Spotify</button>
        )}
      </main>
      <footer>
        <p>&copy; 2023 Spotify. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
