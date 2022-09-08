import Treading from "../../pages/TreadingShows/Treading";
import Home from "../../pages/Home/Home";
import Movies from "../../pages/Movies/Movies";
import TvSeries from "../../pages/TvSeries/TvSeries";
import { Redirect, Route, Switch } from "react-router-dom";
import SinglePage from "../../components/SingleContentPage/SinglePage";
import MainNav from "../../components/MainNavbar/MainNav";
import Footer from "../../components/Footer/Footer";
import CopyWrite from "../../components/CopyWrite__footer/LastFooter";
import BottomNav from "../../components/MainNavbar/BottomNav";

const Routes = () => {
  return (
    <>
      <MainNav />

      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/all-movies" component={Movies} />
          <Route path="/treading" component={Treading} />
          <Route path="/all-series" component={TvSeries} />
          <Route path="/:media-:id-category/" children={<Movies />} />
          <Route path="/movies/:id" children={<Movies />} />
          <Route path="/series/:id" children={<TvSeries />} />
          <Route path="/:mediaType/:id" children={<SinglePage />} />
          <Route path="/movies/page/:page" children={Movies} />
          <Route path="/series/page/:page" children={TvSeries} />
          <Route path="/treading/page/:page" children={Treading} />
          <Route path="/movies/:id/page/:page" children={Movies} />
          <Route path="/movies/:searhTerm/page/:page" children={Movies} />
          <Route path="/:media=series:id2-category/" children={<TvSeries />} />
          <Route path="/series/:searhTerm/page/:page" children={TvSeries} />
          <Redirect to="/error" />
        </Switch>
      </div>
      <Footer />
      <BottomNav />
      <CopyWrite />
    </>
  );
};

export default Routes;
