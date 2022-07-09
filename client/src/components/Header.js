import React, { memo, useState, useEffect, useCallback } from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Share from "./movies/Share";

function Header() {
  const [isShowLoginModel, setIsShowLoginModel] = useState(false);
  const [isShowRegisterModel, setIsShowRegisterModel] = useState(false);
  const [isShowShareModel, setIsShowShareModel] = useState(false);
  const [user, setUser] = useState(null);
  const [isReload, setIsReload] = useState(false);

  const parseJwt = useCallback((token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      if (typeof atob === "undefined") {
        global.atob = function (b64Encoded) {
          return new Buffer(b64Encoded, "base64").toString("binary");
        };
      }
      return JSON.parse(
        decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        )
      );
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    const user = parseJwt(accessToken);
    if (user) {
      setUser(user);
    }
  }, [isReload]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("accessToken");
    setUser(null);
  });

  const handleSetIsReload = useCallback(() => {
    setIsReload(!isReload);
  });

  const handleSetIsShowLoginModel = useCallback((value) => {
    setIsShowLoginModel(value);
  });

  const handleSetIsShowShareModel = useCallback((value) => {
    setIsShowShareModel(value);
  });

  const handleSetIsShowRegisterModel = useCallback((value) => {
    setIsShowRegisterModel(value);
  });

  return (
    <header>
      <div class="div-container">
        <h1>
          <i class="fa fa-home"></i> Funny movies
        </h1>
        <nav>
          <ul>
            {user && <li>Welcome {user.email}</li>}
            <li>
              <button
                class="home-button"
                onClick={() => {
                  setIsShowShareModel(!isShowShareModel);
                  setIsShowRegisterModel(false);
                  setIsShowLoginModel(false);
                }}
              >
                Share a movie
              </button>
            </li>
            <li>
              {!user && (
                <button
                  class="home-button"
                  onClick={() => {
                    setIsShowRegisterModel(!isShowRegisterModel);
                    setIsShowShareModel(false);
                    setIsShowLoginModel(false);
                  }}
                >
                  Register
                </button>
              )}
            </li>

            <li>
              {user ? (
                <button class="home-button" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <button
                  class="home-button"
                  onClick={() => {
                    setIsShowLoginModel(!isShowLoginModel);
                    setIsShowShareModel(false);
                    setIsShowRegisterModel(false);
                  }}
                >
                  Login
                </button>
              )}
            </li>

            <Login
              handleSetIsReload={handleSetIsReload}
              isShowLoginModel={isShowLoginModel}
              handleSetIsShowLoginModel={handleSetIsShowLoginModel}
            />
            <Register
              isShowRegisterModel={isShowRegisterModel}
              handleSetIsShowRegisterModel={handleSetIsShowRegisterModel}
            />
            <Share
              handleSetIsShowShareModel={handleSetIsShowShareModel}
              isShowShareModel={isShowShareModel}
            />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default memo(Header);
