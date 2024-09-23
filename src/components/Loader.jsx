import "./Loader.css";
import LoaderImg from "../assets/loader-mn.gif";
const Loader = () => {
  return (
    <div className="loader">
      <img src={LoaderImg} alt="loader" className="loader-img" />
    </div>
  );
};

export default Loader;
