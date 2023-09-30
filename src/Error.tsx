type ErrorT = {
  message: string;
};
const ErrorS = ({ message }: ErrorT) => {
  return (
    <p className="error">
      <span>❌</span>
      {message}
    </p>
  );
};

export default ErrorS;
