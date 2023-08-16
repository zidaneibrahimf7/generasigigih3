import { useState, useEffect } from 'react';

const RecommendationTab = () => {
  const [recommendationsList, setRecommendationsList] = useState([])

  useEffect(() => {
    const token = 'BQCTEBRNOepSFrNEB-v8u5PGASVQMjDBIW5B2qNRqBeAk9gRcbmNsHMRTUAUISBPpBB_s9RGKdVXVUn1fFWQ6HuFa4HXINMnkc8sEN6_aP4Ms5iAz_gMZ_DY9cRIGSJMX880YeRHdShOuXnvyEgvXLDFduWYDvjwoMfgO7DbgOpAq2WiL5_OYZd1fK3XO-mZU7VgonIWqCXBYKTitbMMcyQhtlM3XqQNQJo1QMS1LZJVKbJIVUn8ttO7cMeICwLwws2kJrIFEp4zO8hWb9ls'
    async function fetchWebApi(endpoint, method, body) {
      const response = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body)
      });
      return await response.json()
    }

    async function getRecommendationList() {
      const topTrackIDs = [
        '2r9hCNjupNy2C2g3r6SNz6',
        '3m71VLuekxke2MO8yHkOYg',
        '1rBTBbtkJlSDk78gg8Dw9F',
        '6SpPr7K4YQ2wp8jU6uOTmQ',
        '28VbwtsYnj85UEODGpQRem',
      ];

      const recommendationSong = await fetchWebApi(
        `v1/recommendations?limit=5&seed_tracks=${topTrackIDs.join(',')}`,
        'GET'
      );

      setRecommendationsList(recommendationSong.tracks)
    }
    getRecommendationList();
  }, []);

  return (
    <div>
      <ul>
        {recommendationsList.map(({ name, artist }) => (
          <li key={name}>
            {name} by {artist.map(() => artist.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  )

}


export default RecommendationTab;