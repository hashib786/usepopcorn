import { useState } from "react";
import Nav from "./Nav";
import MainBody from "./MainBody";
import Box from "./Box";
import Summery from "./Summery";
import MovieList from "./MovieList";
import WatchedList from "./WatchedList";
import Loader from "./Loader";
import ErrorS from "./Error";
import MovieDetail from "./MovieDetail";
import { useMovie } from "./useMovie";
import { useLocalStorage } from "./useLocalStorage";

export interface MovieI {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}
export interface WatchMovieI extends MovieI {
  runtime: number;
  imdbRating: number;
  userRating: number;
}

export const KEY = "2b099c57";

export default function App() {
  const [query, setQuery] = useState("india");
  const [selectId, setSelectId] = useState<string | null>(null);
  const { movies, isLoading, error } = useMovie({ query });
  const [watched, setWatched] = useLocalStorage<WatchMovieI[]>("watched", []);

  const handleSelect = (id: string) => {
    setSelectId((prev) => (prev === id ? null : id));
  };

  const handleCloseMovie = () => setSelectId(null);

  const handleAddWatchedMovie = (movie: WatchMovieI) => {
    setWatched((prev) => [...prev, movie]);
  };

  const handleDeleteWatched = (id: string) => {
    setWatched((prev) => prev.filter((ele) => ele.imdbID !== id));
  };

  return (
    <>
      <Nav movies={movies} query={query} setQuery={setQuery} />

      <MainBody>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList onSelect={handleSelect} movies={movies} />
          )}
          {error && <ErrorS message={error} />}
        </Box>
        <Box>
          {selectId ? (
            <MovieDetail
              watchedMovies={watched}
              onCloseMovie={handleCloseMovie}
              selectedId={selectId}
              onAddWatched={handleAddWatchedMovie}
            />
          ) : (
            <>
              <Summery watched={watched} />
              <WatchedList
                onDeleteWatched={handleDeleteWatched}
                watched={watched}
              />
            </>
          )}
        </Box>
      </MainBody>
    </>
  );
}
