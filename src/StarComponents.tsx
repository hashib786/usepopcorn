import { useState } from "react";
type PropsS = {
  onClick: () => void;
  full: boolean;
};

const Star = ({ onClick, full }: PropsS) => {
  return full ? (
    <span onClick={onClick} style={{ marginRight: "10px", cursor: "pointer" }}>
      S
    </span>
  ) : (
    <span onClick={onClick} style={{ marginRight: "10px", cursor: "pointer" }}>
      H
    </span>
  );
};

type Props = {
  max: number;
};

const StarComponents = ({ max }: Props) => {
  const [numStar, setNumStar] = useState(0);
  return (
    <div>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          onClick={() => setNumStar(i + 1)}
          full={numStar >= i + 1}
        />
      ))}
      <span>{numStar || ""}</span>
    </div>
  );
};

export default StarComponents;
