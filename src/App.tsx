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

export const KEY = "2b099c57";

export default function App() {
  const [query, setQuery] = useState("india");
  const [movies, setMovies] = useState<MovieI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [watched, setWatched] = useState<WatchMovieI[]>(() => {
    const data = localStorage.getItem("watched");
    if (!data) return [];
    return JSON.parse(data);
  });

  const handleSelect = (id: string) => {
    setSelectId((prev) => (prev === id ? null : id));
  };

  const handleCloseMovie = () => setSelectId(null);

  const handleAddWatchedMovie = (movie: WatchMovieI) => {
    setWatched((prev) => [...prev, movie]);
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleDeleteWatched = (id: string) => {
    setWatched((prev) => prev.filter((ele) => ele.imdbID !== id));
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

    handleCloseMovie();

    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

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
