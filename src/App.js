import "./App.css";
import Routes from "./config/Routes/Routes";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/touch-loader/touchLoader";
import React, { useEffect, useState } from "react";
import Myloader from "react-spinners/ClipLoader";
import mySvg from "./images/hbo-max.svg";
import RoutesAuth from "./config/Routes/RoutesAuth";
import NotFound from "./pages/Errors/NotFound";

function App() {
  const [spinner, setSpinner] = useState(true);

  // eslint-disable-next-line
  let [color, setColor] = useState("grey");

  useEffect(() => {
    setTimeout(() => setSpinner(false), 500);
  }, []);
  return (
    <>
      {!spinner ? (
        <BrowserRouter>
          <Switch>
            <Route exact path="/error" component={NotFound} />
            <Route path="/(login)" exact component={RoutesAuth} />
            <Route path="/" component={Routes} />
          </Switch>
        </BrowserRouter>
      ) : (
        <div className="load_app" style={{ height: "400px" }}>
          <Myloader
            color={color}
            size={80}
            className="m__load"
            speedMultiplier={1.5}
          />
          <img src={mySvg} alt="" width="300" className="logo2 pt-4" />{" "}
        </div>
      )}
    </>
  );
}

export default App;
