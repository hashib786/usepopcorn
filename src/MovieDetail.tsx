type IdType = {
  id: string;
  onCloseMovie: () => void;
};
const MovieDetail = ({ id, onCloseMovie }: IdType) => {
  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      {id}
    </div>
  );
};

export default MovieDetail;
