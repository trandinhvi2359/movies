import React, { memo, useState, useEffect } from "react";

import PropTypes from "prop-types";

function Detail({ title, sharedBy, description, link, likeCount }) {
  return (
    <div class="card u-clearfix">
      <div class="card-media">
        <iframe
          class="card-media-video"
          width="420"
          height="345"
          title="test"
          src={link}
        ></iframe>
        <div class="card-media-preview u-flex-center">
          <svg
            fill="#ffffff"
            height="18"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5v14l11-7z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </div>
      </div>

      <div class="card-body">
        <h2 class="card-body-heading">{title}</h2>
        <div>
          {likeCount} &nbsp;
          <button class="dislike">
            <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
          </button>
          &nbsp; 234 &nbsp;
          <button class="like">
            <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
          </button>
        </div>

        <p>
          <b>Shared by:</b> {sharedBy}
        </p>

        <b>Description:</b>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
}

Detail.propTypes = {
  title: PropTypes.string.isRequired,
  sharedBy: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
};

export default memo(Detail);
