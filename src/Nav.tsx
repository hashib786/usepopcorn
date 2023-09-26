import { MovieI } from "./App";

type Props = {
  query: string;
  movies: MovieI[];
  handleQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Nav = ({ movies, query, handleQuery }: Props) => {
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
        onChange={handleQuery}
      />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
};

export default Nav;
