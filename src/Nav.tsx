import { useEffect, useRef } from "react";
import { MovieI } from "./App";

type Props = {
  query: string;
  movies: MovieI[];
  setQuery: (value: React.SetStateAction<string>) => void;
};

const Nav = ({ movies, query, setQuery }: Props) => {
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (document.activeElement === searchInput.current) return;
      if (e.key === "Enter") {
        setQuery("");
        searchInput.current?.focus();
      }
    };

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={searchInput}
      />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
};

export default Nav;
