import WatchMovieItem from "./WatchedMovieItem";

function WatchedList({ watched, handleDeleteWatch }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchMovieItem
          handleDeleteWatch={handleDeleteWatch}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
export default WatchedList;
