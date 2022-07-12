import React, { useState, useMemo } from "react";

export const ShowHideContext = React.createContext({
  showHideForm: {},
  setShowHideForm: () => {},
});

const parseJwt = (token) => {
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
};

export const ShowHideProvider = ({ children }) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const [showHideForm, setShowHideForm] = useState({
    isShowLoginForm: !accessToken,
    isShowRegisterForm: false,
    isSHowShareForm: false,
    isShowListLink: accessToken,
    user: parseJwt(accessToken),
  });

  const showHideFormValue = useMemo(() => ({ showHideForm, setShowHideForm }), [
    showHideForm,
  ]);

  return (
    <ShowHideContext.Provider value={showHideFormValue}>
      {children}
    </ShowHideContext.Provider>
  );
};
