import React, { memo, useState, useCallback, useContext } from "react";
import InfiniteScroll from "react-infinite-scroller";

import Detail from "./Detail";
import { getLinks } from "../../graphql/query/link";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import Share from "./Share";
import { ShowHideContext } from "../../context/ShowHideProvider";

const limit = 2;

function List(props) {
  const { showHideForm, setShowHideForm } = useContext(ShowHideContext);

  const [links, setLinks] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const loadFunction = (pageToLoadMore) => handleGetLinks(pageToLoadMore);

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const handleGetLinks = (page) => {
    fetch(`${process.env.REACT_APP_BASE_API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      body: JSON.stringify({
        query: getLinks,
        variables: {
          limit,
          page,
        },
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("res.data.getLinks: ", res.data.getLinks);
        console.log("res.data.getLinks.hasMore: ", res.data.getLinks.hasMore);
        setLinks([...links, ...res.data.getLinks.links]);
        setHasMore(res.data.getLinks.hasMore);
      });
  };

  return (
    <div class="container">
      {!showHideForm.isSHowShareForm && accessToken && links && (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunction}
          hasMore={hasMore}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {links &&
            links.map((link) => (
              <Detail
                key={link?.id}
                title={link?.title}
                sharedBy={link?.createdBy || ""}
                description={link?.description}
                link={link?.link}
                likeCount={link?.likeCount}
              />
            ))}
        </InfiniteScroll>
      )}

      {!accessToken && (
        <center>
          <div class="main">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <Register />
            <Login />
          </div>
        </center>
      )}

      {showHideForm.isSHowShareForm && (
        <center>
          <div class="main">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <Share />
          </div>
        </center>
      )}
    </div>
  );
}

export default memo(List);
