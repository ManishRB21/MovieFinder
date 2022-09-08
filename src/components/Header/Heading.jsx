import "./Heading.css";
import mySvg from "../../images/hbo-max.svg";

const Heading = () => {
  return (
    <div className="MainHeading">
      <img src={mySvg} alt="" className="logo2" />{" "}
    </div>
  );
};

export default Heading;
