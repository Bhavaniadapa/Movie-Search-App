import {useEffect, useState} from 'react';
import "./App.css"

import MovieCard from './MovieCard';

import SearchIcon from './search.svg'; 


const API_URL="http://www.omdbapi.com?apikey=551576d4";

const App = () => {
    const [movies, setMovies] =useState([]);
    const [searchItem,setSearchItem]=useState("");
    const searchMovies = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data= await response.json();
        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies("");
    },[]);
    
    return (
        <div className="app">
            <h1>Movie Search App</h1>
            <div className='search'>
                <input  placeholder='Search for Movies' 
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                />
                <img src={SearchIcon}
                alt='search'
                onClick={
                    () => searchMovies(searchItem)
                } />
            </div>

            {
                movies?.length > 0
                ?(
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie = {movie}  />
                        ) )}
                        
                    </div>
                ):
                (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }
                
        </div>
    );
}

export default App;