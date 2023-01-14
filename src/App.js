import { useEffect, useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

import './App.css'
import SearchIcon from './search.png'
import Movie from './Movie'

const API_URL='http://www.omdbapi.com?apikey=db519557'

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async(title) => {
    const res = await fetch(`${API_URL}&s=${title}`)
    const data = await res.json();
    console.log(data)
    if(data.Search)
      setMovies(data.Search)
    else if(data.Response === 'True')
      setMovies([data])
    else
      setMovies([])
  }
  useEffect(() => { searchMovies('Batman') }, [])

  const inputRef = useRef(null);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className='search'>
        <input ref={inputRef}
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchMovies(searchTerm)}
        />
        <img src={SearchIcon} alt='search' onClick={() => searchTerm && searchMovies(searchTerm)}/>
      </div>
      
      {movies.length > 0 ? (
        <div className='container'>
          { movies.map((movie) => (
            <Movie key={uuidv4()} movie={movie} />
          ))}
        </div>
      ) : (
        <div>
          <h2>Mo Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
