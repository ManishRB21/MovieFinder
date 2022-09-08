import { useHistory } from "react-router-dom";
import "./NotFound.css";
const NotFound = () => {
  const history = useHistory();
  const returnHome = () => {
    history.push("/");
  };

  return (
    <>
      <div className="not__found">
        <div className="404 d-flex justify-content-center pt-5">
          <button onClick={returnHome}>RETURN HOME</button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
