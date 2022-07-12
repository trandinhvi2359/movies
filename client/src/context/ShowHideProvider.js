import React, { useState, useMemo } from "react";

export const ShowHideContext = React.createContext({
  showHideForm: {},
  setShowHideForm: () => {},
});

export const ShowHideProvider = ({ children }) => {
  const [showHideForm, setShowHideForm] = useState({
    isShowLoginForm: true,
    isShowRegisterForm: false,
    isSHowShareForm: false,
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
