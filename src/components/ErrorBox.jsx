import "./ErrorBox.css";

const ErrorBox = ({ errors, isVisible }) => {
  return (
    <div className={`error-box ${isVisible ? "show" : ""}`}>
      {errors.map((error, index) => (
        <div key={index} className="error-message">
          {error}
        </div>
      ))}
    </div>
  );
};

export default ErrorBox;
