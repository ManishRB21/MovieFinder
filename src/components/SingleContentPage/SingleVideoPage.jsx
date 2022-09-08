import $ from "jquery";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./SinglePage.css";

const SingleVideoPage = ({ trailer, url, title }) => {
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

  return (
    <>
      <div className="wrapper">
        <div className="image play_trailer" data-title="Arrival">
          <div
            className="btn btn-success px-4"
            data-toggle="modal"
            data-target={`#${trailer}`}
          >
            <span>
              <YouTubeIcon style={{ color: "#e93d3d" }} />
            </span>{" "}
            Watch Trailer
          </div>
        </div>
      </div>

      <div
        className="modal fade myModal "
        id={`${trailer}`}
        tabIndex={`-1`}
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ zIndex: "1500", marginTop: "20px" }}
          >
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
                type="text/html"
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

export default SingleVideoPage;
