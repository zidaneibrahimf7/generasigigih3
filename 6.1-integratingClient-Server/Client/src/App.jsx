import { useEffect, useState } from 'react'

const App = () => {
  const [hero, setHero] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:5001");
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setHero(data)
      }
      catch (error) {
        console.log("Error", error)
      }
    }

    fetchPosts();
  }, [])

  return (
    <div>
      {hero.map(home => {
        return (
          <div key={home.id}>
            <h1>{home.name}</h1>
            <p>{home.greeting}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App
