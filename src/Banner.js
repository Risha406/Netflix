import axios from './axios';
import React, { useEffect, useState } from 'react';
import './Banner.css';
import requests from './Requests';

function Banner() {

    const [movie, setMovie]= useState([]);

    useEffect(()=> {
        async function fetchData() {  //fetching the movie and shown on banner
            const request = await axios.get(requests.fetchTrending); //import the request
            setMovie(                       //request will ome back here
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1) //generate a random nuber and set to that movie from the list of requests
                ]
            );
            return request;
        }
        fetchData()
    }, []);

    console.log(movie);

    function truncate(string, n) {   //n will number fo chars before you wnt to cut and put ...
        return string?.length > n ? string.substr(0, n-1) + '...' : string;
    }

    return (
        <header 
            className="banner" 
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("http://image.tmdb.org/t/p/original/${movie?.
                backdrop_path}")`,   //till original beginning point of geeting the image of the rquest movie
                backgroundPosition: "center center",  // the image must stay in center when we are min. or max. the screen
            }} 
        > 
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                
                </h1> 

                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My list</button>    
                </div>  

                <h1 className="banner__description"> {truncate (movie?.overview , 150)}</h1> 
            </div>  

            <div className="banner--fadeBottom"/>
        </header>
    );
}

export default Banner