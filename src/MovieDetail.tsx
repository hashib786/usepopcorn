import { useEffect, useState } from "react";
import { KEY, WatchMovieI } from "./App";
import Loader from "./Loader";
import StarRating from "./StarComponents";

type IdType = {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: WatchMovieI) => void;
  watchedMovies: WatchMovieI[];
};

interface MovieDetails {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
}

const MovieDetail = ({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watchedMovies,
}: IdType) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data: MovieDetails = await res.json();
      setMovie(data);
      setIsLoading(false);
    })();
  }, [selectedId]);

  useEffect(() => {
    if (!movie) return;
    document.title = `Movie | ${movie.Title}`;
  }, [movie]);

  if (!movie) return null;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const handleAdd = () => {
    const watchedMovie: WatchMovieI = {
      imdbID: selectedId,
      Title: title,
      Year: year,
      Poster: poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(watchedMovie);
    onCloseMovie();
  };

  const isWatched = watchedMovies.find((ele) => ele.imdbID === selectedId);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={20}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {isWatched.userRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
