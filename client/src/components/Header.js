import React, { memo, useContext } from "react";
import { ShowHideContext } from "../context/ShowHideProvider";

function Header() {
  const { showHideForm, setShowHideForm } = useContext(ShowHideContext);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setShowHideForm({
      isShowLoginForm: true,
      isShowRegisterForm: false,
      isSHowShareForm: false,
      isShowListLink: false,
      user: null,
    });
  };

  return (
    <header>
      <div class="div-container">
        <h1>
          <i class="fa fa-home"></i> Funny movies
        </h1>
        <nav>
          <ul>
            {showHideForm.user && <li>Welcome {showHideForm.user.email}</li>}
            {showHideForm.user && (
              <li>
                <button
                  class="home-button"
                  onClick={() =>
                    setShowHideForm({
                      ...showHideForm,
                      ...{
                        isShowLoginForm: false,
                        isShowRegisterForm: false,
                        isSHowShareForm: !showHideForm.isSHowShareForm,
                        isShowListLink: showHideForm.isSHowShareForm,
                      },
                    })
                  }
                >
                  Share a movie
                </button>
              </li>
            )}

            <li>
              {!showHideForm.user && (
                <button
                  class="home-button"
                  onClick={() =>
                    setShowHideForm({
                      ...showHideForm,
                      ...{
                        isShowRegisterForm: true,
                        isShowLoginForm: false,
                        isSHowShareForm: false,
                        isShowListLink: false,
                      },
                    })
                  }
                >
                  Register
                </button>
              )}
            </li>

            <li>
              {showHideForm.user ? (
                <button class="home-button" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <button
                  class="home-button"
                  onClick={() =>
                    setShowHideForm({
                      ...showHideForm,
                      ...{
                        isShowLoginForm: true,
                        isShowRegisterForm: false,
                        isSHowShareForm: false,
                        isShowListLink: false,
                      },
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
