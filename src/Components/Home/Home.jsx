import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "04d60c1d5c3bdb10dc513f59e3dd0985";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowplayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topratedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  // useEffect(() => {
  //   const fetchUpcomingMovies = async () => {
  //     const {
  //       data: { results },
  //     } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
  //     console.log(results);
  //     setUpcomingMovies(results);
  //   };
  //   const fetchNowPlayingMovies = async () => {
  //     const {
  //       data: { results },
  //     } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
  //     setNowPlayingMovies(results);
  //   };
  //   const fetchPopularMovies = async () => {
  //     const {
  //       data: { results },
  //     } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
  //     setPopularMovies(results);
  //   };
  //   const fetchTopRatedMovies = async () => {
  //     const {
  //       data: { results },
  //     } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
  //     setTopRatedMovies(results);
  //   };

  //   const getAllGenre = async () => {
  //     const {
  //       data: { genres },
  //     } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
  //     setGenre(genres);
  //     console.log(genres);
  //   };

  //   getAllGenre();
  //   fetchUpcomingMovies();
  //   fetchNowPlayingMovies();
  //   fetchPopularMovies();
  //   fetchTopRatedMovies();
  // }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const upcomingMoviesResponse = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
        const nowPlayingMoviesResponse = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
        const popularMoviesResponse = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
        const topRatedMoviesResponse = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
        const genresResponse = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
  
        setUpcomingMovies(upcomingMoviesResponse.data.results);
        setNowPlayingMovies(nowPlayingMoviesResponse.data.results);
        setPopularMovies(popularMoviesResponse.data.results);
        setTopRatedMovies(topRatedMoviesResponse.data.results);
        setGenre(genresResponse.data.genres);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  




  // useEffect(() => {
  //   const fetchData = async () => {
  //     const requests = [
  //       axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`),
  //       axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`),
  //       axios.get(`${url}/movie/${popular}?api_key=${apiKey}`),
  //       axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`),
  //       axios.get(`${url}/genre/movie/list?api_key=${apiKey}`),
  //     ];
  
  //     const responses = await Promise.all(requests);
  
  //     const [
  //       upcomingMoviesResponse,
  //       nowPlayingMoviesResponse,
  //       popularMoviesResponse,
  //       topRatedMoviesResponse,
  //       genresResponse,
  //     ] = responses;
  
  //     setUpcomingMovies(upcomingMoviesResponse.data.results);
  //     setNowPlayingMovies(nowPlayingMoviesResponse.data.results);
  //     setPopularMovies(popularMoviesResponse.data.results);
  //     setTopRatedMovies(topRatedMoviesResponse.data.results);
  //     setGenre(genresResponse.data.genres);
  //   };
  
  //   fetchData();
  // }, []);
  



  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${imgUrl}/${popularMovies[0].poster_path})`
            : "rgb(16 16 16)",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>
          <button>
            <BiPlay style={{ fill: "black" }} /> Play
          </button>
          <button>
            My List <AiOutlinePlus />
          </button>
        </div>
      </div>
      <Row title={"Up Coming"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowplayingMovies} />
      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topratedMovies} />

      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/gerne/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>

    </section>
  );
};

export default Home;
