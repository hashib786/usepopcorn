import { useEffect, useState } from "react";
import { KEY, MovieI } from "./App";

type Props = {
  query: string;
};

export const useMovie = ({ query }: Props) => {
  const [movies, setMovies] = useState<MovieI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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

    // handleCloseMovie();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
};
