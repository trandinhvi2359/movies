import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Share from "./movies/Share";
import { ShowHideContext } from "../context/ShowHideProvider";

function Header() {
  const [isShowShareModel, setIsShowShareModel] = useState(false);
  const [user, setUser] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const { showHideForm, setShowHideForm } = useContext(ShowHideContext);

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

  useEffect(() => {
    if (
      !showHideForm.isShowRegisterForm &&
      !showHideForm.isShowLoginForm &&
      !showHideForm.isSHowShareForm
    ) {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const user = parseJwt(accessToken);
      console.log("user: ", user);
      if (user) {
        setUser(user);
      }
      window.location.reload();
    }
  }, [showHideForm]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("accessToken");
    setUser(null);
  });

  const handleSetIsReload = useCallback(() => {
    setIsReload(!isReload);
  });

  const handleSetIsShowShareModel = useCallback((value) => {
    setIsShowShareModel(value);
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
                onClick={() =>
                  setShowHideForm({
                    isShowLoginForm: false,
                    isShowRegisterForm: false,
                    isSHowShareForm: !showHideForm.isSHowShareForm,
                  })
                }
              >
                Share a movie
              </button>
            </li>
            <li>
              {!user && (
                <button
                  class="home-button"
                  onClick={() =>
                    setShowHideForm({
                      isShowRegisterForm: true,
                      isShowLoginForm: false,
                      isSHowShareForm: false,
                    })
                  }
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
                  onClick={() =>
                    setShowHideForm({
                      isShowLoginForm: true,
                      isShowRegisterForm: false,
                      isSHowShareForm: false,
                    })
                  }
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default memo(Header);
