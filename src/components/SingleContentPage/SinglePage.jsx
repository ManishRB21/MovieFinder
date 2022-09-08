import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { img_300, img_500, unavailable } from "../../api/config/DefaultImages";
import SingleData from "../SingleData/SingleData";
import "./SinglePage.css";
import SingleVideoPage from "./SingleVideoPage";
import Myloader from "react-spinners/ClipLoader";

import Carousel from "../Carousel/Carousel";
import $ from "jquery";

const SinglePage = () => {
  $(function () {
    $(".ico").on("click", function () {
      $(".ico").toggleClass("press", 1000);
    });
  });
  const [content, setContent] = useState();
  const [similarMovies, setSimilarMovies] = useState();
  const [video, setVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [color, setColor] = useState("grey");
  const history = useHistory();
  const { id, mediaType } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(` 
      https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&page=1`);
      // eslint-disable-next-line
      setContent(data);
      setIsLoading(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        history.replace("/error");
      }
    }
  };
  const fetchSimilarMovies = async () => {
    try {
      const { data } = await axios.get(` 
     https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`);
      // eslint-disable-next-line
      const dataSlice = data.results;
      const filter = dataSlice.slice(0, 7);

      // eslint-disable-next-line
      setSimilarMovies(filter);
      setIsLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVideos = async () => {
    try {
      const { data } = await axios.get(` 
     https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);

      setVideo(data.results[0].key);
      setIsLoading(true);

      // eslint-disable-next-line
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);

    fetchData();
    fetchSimilarMovies();
    fetchVideos();

    // eslint-disable-next-line
  }, [id, setContent]);
  return (
    <>
      {isLoading ? (
        <>
          <div>
            {content && (
              <div
                className="open__modal"
                style={{
                  backgroundImage: `url( https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${content.backdrop_path})`,
                }}
              >
                <img
                  className="poster__img"
                  src={
                    content.poster_path
                      ? `${img_300}/${content.poster_path}`
                      : unavailable
                  }
                  alt=""
                />
                <img
                  className="backdrop__img"
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailable
                  }
                  alt=""
                />

                <div className="open__detailsPage">
                  <h3>{content.original_title || content.name}</h3>
                  <div
                    style={{
                      zIndex: "1000",
                      marginTop: "10px",
                      textAlign: "left",
                    }}
                    className="year"
                  >
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}{" "}
                    .
                    <b className="title_me">
                      {mediaType === "tv" ? "Tv Series ." : "Movie ."}
                    </b>
                    <b className="vote_back">
                      <b className="tmdb">TMDB</b>
                      <b className="vote_ave">-⭐{content.vote_average}</b>
                    </b>
                  </div>
                  <h5
                    style={{
                      display: "flex",
                      fontSize: "12px",
                    }}
                    className="genreList"
                  >
                    {content.genres.map((n, i) => {
                      return (
                        <p
                          key={n.id}
                          style={{ fontSize: "13px", marginLeft: "6px" }}
                          className="mygenre"
                        >
                          {i > 0 && ", "}
                          {n.name}
                        </p>
                      );
                    })}
                  </h5>

                  <div className="videopage">
                    {content && (
                      <SingleVideoPage trailer={video} title={content.title} />
                    )}
                  </div>
                  <div className="tagline">
                    <h5>{content.tagline}</h5>
                  </div>
                  <div className="overview">
                    <p>{content.overview}</p>
                  </div>
                  <div className="other_lists">
                    <ul>
                      <li>
                        DURATION:{" "}
                        <span>
                          {mediaType === "tv"
                            ? `${content.episode_run_time[0]} min episodes`
                            : `${content.runtime} min`}
                        </span>
                      </li>
                      {mediaType === "tv" ? (
                        <li>
                          SEASONS: <span>{content.number_of_seasons}</span>
                        </li>
                      ) : (
                        ""
                      )}

                      <li>
                        STUDIO:
                        {content.production_companies.map((studio, i) => {
                          return (
                            <span key={studio.id}>
                              {" "}
                              {i > 0 && ",  "}
                              {studio.name}
                            </span>
                          );
                        })}
                      </li>
                      {mediaType === "movie" ? (
                        <li>
                          RELEASE DATE: <span>{content.release_date}</span>
                        </li>
                      ) : (
                        ""
                      )}
                      <li>
                        STATUS: <span>{content.status}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="all__cast px-5 pt-5">
            <div className="cast__title">
              <h2>Cast</h2>
            </div>
            <div>
              <Carousel mediaType={mediaType} id={id} />
            </div>
          </div>
          <div className="similar__shows">
            <div className="btn__title">
              <h5>You May Also Like </h5>
            </div>
            <div className="similar">
              {similarMovies &&
                similarMovies.map((n) => (
                  <SingleData key={n.id} {...n} mediaType="movie" />
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="load_app" style={{ height: "500px" }}>
          <Myloader color={color} size={60} />
          <p
            className="pt-4 text-secondary text-loading"
            style={{ textTransform: "capitalize", fontSize: "1rem" }}
          >
            Loading Please Wait...
          </p>
        </div>
      )}
    </>
  );
};

export default SinglePage;
