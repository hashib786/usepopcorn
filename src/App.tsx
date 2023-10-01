import { useEffect, useState } from "react";
import Nav from "./Nav";
import MainBody from "./MainBody";
import Box from "./Box";
import Summery from "./Summery";
import MovieList from "./MovieList";
import WatchedList from "./WatchedList";
import Loader from "./Loader";
import ErrorS from "./Error";
import MovieDetail from "./MovieDetail";

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

// const tempMovieData: MovieI[] = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData: WatchMovieI[] = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

export const KEY = "2b099c57";

export default function App() {
  const [query, setQuery] = useState("india");
  const [movies, setMovies] = useState<MovieI[]>([]);
  const [watched, setWatched] = useState<WatchMovieI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleSelect = (id: string) => {
    setSelectId((prev) => (prev === id ? null : id));
  };

  const handleCloseMovie = () => setSelectId(null);

  const handleAddWatchedMovie = (movie: WatchMovieI) => {
    setWatched((prev) => [...prev, movie]);
  };

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Something is Wrong fetching Movie");
        const data = await res.json();
        if (data.Response === "False") throw new Error("No Movie Found");
        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (!(error instanceof Error) || error.name !== "AbortError") {
          setError(
            error instanceof Error
              ? error.message
              : "Something went wrong when fetching movies"
          );
        }
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [query]);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleDeleteWatched = (id: string) => {
    setWatched((prev) => prev.filter((ele) => ele.imdbID !== id));
  };

  return (
    <>
      <Nav movies={movies} query={query} handleQuery={handleQuery} />

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
