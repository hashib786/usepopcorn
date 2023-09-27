import { useState } from "react";
type PropsS = {
  onLeave: () => void;
  onHover: () => void;
  onClick: () => void;
  full: boolean;
};

const Star = ({ onClick, full, onHover, onLeave }: PropsS) => {
  return full ? (
    <span
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ marginRight: "10px", cursor: "pointer" }}
    >
      ⭐
    </span>
  ) : (
    <span
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ marginRight: "10px", cursor: "pointer" }}
    >
      ✡️
    </span>
  );
};

type Props = {
  max: number;
};

const StarComponents = ({ max }: Props) => {
  const [numStar, setNumStar] = useState(0);
  const [tempStar, setTempStar] = useState(0);
  return (
    <div>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          onClick={() => setNumStar(i + 1)}
          full={tempStar ? tempStar >= i + 1 : numStar >= i + 1}
          onHover={() => setTempStar(i + 1)}
          onLeave={() => setTempStar(0)}
        />
      ))}
      <span>{tempStar || numStar || ""}</span>
    </div>
  );
};

export default StarComponents;
