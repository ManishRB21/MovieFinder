import axios from "axios";
import { useEffect, useState } from "react";
import SingleData from "../../components/SingleData/SingleData";
import "./TreadingHome.css";
import "./../PagesStyles.css";
import Pagination from "../../components/Pagination/Pagination";
import Myloader from "react-spinners/PuffLoader";

const Treading = () => {
  const [treadingContent, setTreadingContent] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  let [color, setColor] = useState("grey");

  const fetchTreadinApi = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setTreadingContent(data.results);
    setIsLoading(true);
    // eslint-disable-next-line
  };

  useEffect(() => {
    fetchTreadinApi();
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      <main className="all__treads">
        <div className="my__main2  pt-5">
          <div
            style={{ marginTop: "0px", color: "white" }}
            className="TreadingHome"
          >
            <h3> Treading Shows:</h3>
          </div>
          <Pagination
            setPage={setPage}
            page={page}
            media="treading"
            numOfPages="3"
          />
        </div>

        <div className="ListContent2">
          {isLoading && treadingContent ? (
            treadingContent.map((n) => <SingleData key={n.id} {...n} />)
          ) : (
            <div
              className="loading  "
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
        <Pagination
          setPage={setPage}
          page={page}
          media="treading"
          numOfPages="3"
        />
      </main>
    </>
  );
};

export default Treading;
