import React, { useEffect } from 'react';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get('code');

  useEffect(() => {
    async function exchangeAuthorizationCodeForToken() {
      if (authorizationCode) {
        const response = await fetch('http://localhost:3000/callback?code=' + authorizationCode);
        const data = await response.json();
        const accessToken = data.accessToken;
        console.log('Access Token:', accessToken);
      }
    }

    exchangeAuthorizationCodeForToken();
  }, [authorizationCode]);

  return (
    <>
      <div className="container">
        <h3>Recommendation Song Spotify</h3>
        {/* Your components */}
      </div>
    </>
  );
}

export default App;
