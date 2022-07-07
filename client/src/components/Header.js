import React, { memo, useState } from "react";
import Login from "./authentication/Login";
import Share from "./movies/Share";

function Header() {
  const [isShowLoginModel, setIsShowLoginModel] = useState(false);
  const [isShowShareModel, setIsShowShareModel] = useState(false);

  return (
    <header>
      <div class="div-container">
        <h1>
          <i class="fa fa-home"></i> Funny movies
        </h1>
        <nav>
          <ul>
            <li>Welcome someone@gmail.com</li>
            <li>
              <button
                class="home-button"
                onClick={() => setIsShowShareModel(!isShowShareModel)}
              >
                Share a movie
              </button>
            </li>
            <li>
              <button
                class="home-button"
                onClick={() => setIsShowLoginModel(!isShowLoginModel)}
              >
                Login
              </button>
            </li>
            <Login isShowLoginModel={isShowLoginModel} />
            <Share isShowShareModel={isShowShareModel} />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default memo(Header);
