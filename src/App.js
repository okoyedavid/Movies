import { useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import ErrorMessage from "./common/ErrorMessage";
import Loader from "./common/Loader";
import MovieList from "./components/MovieList";
import Main from "./components/Main";
import Box from "./components/Box";
import Search from "./components/Search";
import NumResults from "./common/NumResults";
import MovieDetails from "./components/MovieDetails";
import baseUrl from "./api/api";
import Summary from "./components/Summary";
import WatchedList from "./components/WatchedList";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${baseUrl}s=${query}`);

        if (!res.ok)
          throw new Error("something went terribly wrong when fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("movie not found");

        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
  }, [query]);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatch(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatch(id) {
    setWatched((watched) => watched.filter((item) => item.imdbID !== id));
  }
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList onselectMovie={handleSelectMovie} movies={movies} />
          )}
          {error && <ErrorMessage error={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatch={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList
                watched={watched}
                movies={movies}
                handleDeleteWatch={handleDeleteWatch}
              />
            </>
          )}{" "}
        </Box>
      </Main>
    </>
  );
}
