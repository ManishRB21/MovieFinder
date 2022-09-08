import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import LocalSearch from "../../components/Search/LocalSearch";
import SingleData from "../../components/SingleData/SingleData";
import Myloader from "react-spinners/PuffLoader";
import Genre from "../../components/Genres/Genre";
import useGenre from "../../components/Genres/UseGenre";

const TvSeries = () => {
  const [treadingContent, setTreadingContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterGenre, setFilterGenre] = useState([]);
  const genreforURL = useGenre(filterGenre);
  const [genreTitle, setGenreTitle] = useState();
  // eslint-disable-next-line
  const [color, setColor] = useState("grey");

  const fetchMovieApi = async () => {
    try {
      const { data } = await axios.get(
        ` 
        https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&sort_by=popularity.desc&with_genres=${genreforURL}
        `
      );
      setTreadingContent(data.results);
      setIsLoading(true);
      setNumOfPages(100);

      // eslint-disable-next-line
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSearchApi = async () => {
    if (searchTerm) {
      const SEARCH_API = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}&page=${page}&sort_by=popularity.desc`;
      const { data } = await axios.get(SEARCH_API);
      setTreadingContent(data.results);
      setNumOfPages(data.total_pages);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);

    if (searchTerm) {
      fetchSearchApi();
    } else {
      fetchMovieApi();
    }
    return () => {
      setTreadingContent(); //clean up
    };
    // eslint-disable-next-line
  }, [page, isLoading, genreforURL]);

  return (
    <>
      <main className="all__series">
        <div className="my__main">
          <div className="TreadingHome">
            <h3> {genreTitle && genreTitle.name} TV series:</h3>
          </div>
          <LocalSearch
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            fetchSearchApi={fetchSearchApi}
            numOfpages={numOfPages}
            media="series"
            placehold="Search Tv Series"
          />
        </div>
        <div className="sec__main ">
          <span className="all__genres ">
            <Genre
              media="tv"
              setFilterGenre={setFilterGenre}
              filterGenre={filterGenre}
              setTreadingContent={setTreadingContent}
              setPage={setPage}
              numOfpages={numOfPages}
              page={page}
              setGenreTitle={setGenreTitle}
            />
          </span>
          <div className="pag  ">
            {/* <Pagination
              setPage={setPage}
              numOfPages={numOfPages}
              media="series"
              page={page}
              setIsLoading={setIsLoading}
              searchTerm={searchTerm}
              style={{ marginBottom: "10px" }}
            /> */}
          </div>
        </div>

        <div className="ListContent">
          {isLoading && treadingContent ? (
            treadingContent.map((n) => (
              <SingleData key={n.id} {...n} mediaType="tv" />
            ))
          ) : (
            <div
              className="loading"
              style={{
                display: "flex",
                height: "450px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Myloader color={color} size={60} />
              <p
                style={{
                  color: "grey",
                  fontSize: "13px",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                fetching data ...
              </p>
            </div>
          )}
        </div>

        {numOfPages > 1 && (
          <Pagination
            setPage={setPage}
            numOfPages={numOfPages}
            media="series"
            page={page}
            searchTerm={searchTerm}
            setIsLoading={setIsLoading}
            style={{ marginBottom: "10px" }}
          />
        )}
      </main>
    </>
  );
};

export default TvSeries;
