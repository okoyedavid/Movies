import { useState } from "react";
import NavBar from "./components/Navbar";
import ErrorMessage from "./common/ErrorMessage";
import Loader from "./common/Loader";
import MovieList from "./components/MovieList";
import Main from "./components/Main";
import Box from "./components/Box";
import Search from "./components/Search";
import NumResults from "./common/NumResults";
import MovieDetails from "./components/MovieDetails";
import Summary from "./components/Summary";
import WatchedList from "./components/WatchedList";
import UseMovies from "./api/UseMovies";
import useLocalStorage from "./components/useLocalStorage";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorage([], "watched");

  const { movies, isLoading, error } = UseMovies(query);

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
