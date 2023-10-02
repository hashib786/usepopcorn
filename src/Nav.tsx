import { useRef } from "react";
import { MovieI } from "./App";
import { useKey } from "./useKey";

type Props = {
  query: string;
  movies: MovieI[];
  setQuery: (value: React.SetStateAction<string>) => void;
};

const Nav = ({ movies, query, setQuery }: Props) => {
  const searchInput = useRef<HTMLInputElement>(null);
  useKey("Enter", () => {
    if (document.activeElement === searchInput.current) return;
    setQuery("");
    searchInput.current?.focus();
  });

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
