import { Redirect, Route } from "react-router-dom";
import SignIn from "../../components/Authetication/SignIn";

const RoutesAuth = () => {
  return (
    <>
      {" "}
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/Login" component={SignIn} exact />
    </>
  );
};

export default RoutesAuth;
