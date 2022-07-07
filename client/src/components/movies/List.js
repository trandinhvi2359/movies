import React, { memo } from "react";
import Detail from "./Detail";
// import axios from 'axios';

function List(props) {
  // const [data, setData] = useState([]);
  // const [showLoading, setShowLoading] = useState(true);
  // const apiUrl = "http://localhost:3000/api/v1/products";
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios(apiUrl);
  //     setData(result.data);
  //     setShowLoading(false);
  //   };
  //
  //   fetchData();
  // }, []);

  return (
    <div class="container">
      <Detail
        title="Batman testing 1"
        sharedBy="someone@gmail.com"
        description="test"
      />
      <Detail
        title="Batman testing 2"
        sharedBy="someone@gmail.com"
        description="test"
      />
    </div>
  );
}

export default memo(List);
