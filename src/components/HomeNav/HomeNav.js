import "./HomeNav.css";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
// const handleDragStart = (e) => e.preventDefault();

const HomeNav = () => {
  const [allContent, setAllContent] = useState([]);
  const history = useHistory();

  const handleClick = (id, media) => {
    history.push(`/${media}/${id}/`);
  };
  const items = allContent.map((item) => (
    <div
      key={item.id}
      className="main__nav"
      style={{
        backgroundImage: `url( https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${item.backdrop_path})`,
      }}
    >
      <div className="nav">
        <h3>{item.title || item.name}</h3>
        <h5 style={{ color: "#abb7c4" }}>
          {item.media_type === "tv" ? "Tv Series" : "Movie"}
        </h5>

        <p>{item.overview}</p>
        <div className="back__btn">
          <button onClick={() => handleClick(item.id, item.media_type)}>
            LEARN MORE
          </button>
        </div>
      </div>
    </div>
  ));

  const fetchPopularMovieApi = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const alldata = data.results;
      const filter = alldata.slice(0, 10);
      const red = filter.reverse();

      setAllContent(red);
      // eslint-disable-next-line
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPopularMovieApi();

    // eslint-disable-next-line
  }, []);

  return (
    <AliceCarousel
      infinite
      autoPlay
      disableButtonsControls
      disableDotsControls
      mouseTracking
      autoPlayInterval={1500}
      items={items}
      //   responsive={responsive}
    />
  );
};

export default HomeNav;
