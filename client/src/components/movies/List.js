import React, { memo, useState, useEffect } from "react";
import Detail from "./Detail";
// import axios from 'axios';

import { useQuery } from "react-apollo";
import { getLinks } from "../../graphql/query/link";

function List(props) {
  const [links, setLinks] = useState([]);
  // const [showLoading, setShowLoading] = useState(true);
  // const apiUrl = "http://localhost:3000/api/v1/products";
  //

  const { loading, data, error } = useQuery(getLinks, {
    variables: { page: 1, limit: 10 },
  });

  // useEffect(() => {
  //   const abrefetch();
  //   // console.log("abc: ", abc);
  // }, [data]);

  // console.log("loading: ", loading);
  // console.log("error: ", error);

  useEffect(() => {
    if (data) {
      setLinks(data);
    }
    console.log("loading: ", loading);
    console.log("data12121: ", data);
  }, [data]);

  console.log("data: ", data);
  console.log("error: ", error);

  return (
    <div class="container">
      <Detail title="Test" sharedBy="someone@gmail.com" description="test" />
    </div>
  );
}

export default memo(List);
