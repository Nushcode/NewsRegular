import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source  } =
      this.props;
    return (
      <div className="my-3 mx-4">
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}{" "}
              <span
                class="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
                style={{ left: "70%", zIndex: "1" }}
              >
                {source}
              </span>
            </h5>
            <p className="card-text">
              {description}
              <span class="badge bg-secondary mx-3">New</span>
            </p>
            <p class="card-text my-3">
              <small class="text-body-secondary">
                By {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
