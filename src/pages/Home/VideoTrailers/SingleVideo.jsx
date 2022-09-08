import "bootstrap/dist/css/bootstrap.min.css";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import {
  img_500,
  unavailableLandscape,
} from "../../../api/config/DefaultImages";
import "./video.css";
import $ from "jquery";

const SingleVideo = ({ trailer, url, title }) => {
  // Stops youtube video playing in background after close
  $(document).ready(function () {
    $(".modal").each(function () {
      var src = $(this).find("iframe").attr("src");

      $(this).on("click", function () {
        $(this).find("iframe").attr("src", "");
        $(this).find("iframe").attr("src", src);
      });
    });
  });
  // end
  return (
    <>
      <div className="wrapper">
        <div
          className="image play_trailer"
          data-title="Arrival"
          data-toggle="modal"
          data-target={`#${trailer}`}
          // data-target="#myModal"
        >
          <img
            src={url ? `${img_500}/${url}` : unavailableLandscape}
            alt=""
            width="300"
            height="180"
          />

          <div className="play">
            <span className="glyphicons_v2 play invert svg">
              {/* <PlayArrowRoundedIcon
                style={{ color: "white", fontSize: "5rem" }}
                fontSize="large"
              /> */}
            </span>
          </div>
          <div className="trailer__details">{/* <h6>{title}</h6> */}</div>
        </div>
      </div>

      <div
        className="modal fade myModal "
        id={`${trailer}`}
        tabIndex={`-1`}
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title} Official Trailer
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" style={{ color: "white" }}>
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-video">
              <iframe
                title={title}
                style={{ backgroundColor: "#000" }}
                src={`https://www.youtube-nocookie.com/embed/${trailer}?autoplay=0&amp;origin=http%3A%2F%2Fwww.themoviedb.org&amp;hl=en&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleVideo;
