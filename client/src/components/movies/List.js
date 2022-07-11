import React, { memo, useMemo, useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";

import Detail from "./Detail";
import { getLinks } from "../../graphql/query/link";

const limit = 2;

function List(props) {
  const [links, setLinks] = useState([]);

  const loadFunction = useCallback((pageToLoadMore) => {
    console.log("handle load more page: ", pageToLoadMore);
    handleGetLinks(pageToLoadMore - 1);
  });

  const accessToken = useMemo(() =>
    JSON.parse(localStorage.getItem("accessToken"))
  );

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
        setLinks([...links, ...res.data.getLinks]);
      });
  };

  useEffect(() => {
    handleGetLinks(0);
  }, []);

  return (
    <div class="container">
      {links && (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunction}
          hasMore={true || false}
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
    </div>
  );
}

export default memo(List);
