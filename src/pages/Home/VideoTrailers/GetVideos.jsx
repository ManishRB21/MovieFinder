import axios from "axios";
import { useEffect, useState } from "react";
import SingleVideo from "./SingleVideo";

const GetVideos = ({ id, url, title }) => {
  const [trailer, setTrailer] = useState();

  const fetchVideosApi = async () => {
    const { data } = await axios.get(` 
      https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
    setTrailer(data.results[0]?.key);
  };
  useEffect(() => {
    fetchVideosApi();
    return () => {
      setTrailer(); //clean up
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ margin: "10px" }}>
      {trailer && <SingleVideo trailer={trailer} url={url} title={title} />}
    </div>
  );
};

export default GetVideos;
