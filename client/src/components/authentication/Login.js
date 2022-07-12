import { memo, useState, useEffect, useContext } from "react";
import { useToasts } from "react-toast-notifications";

import { login } from "../../graphql/query/authentication";
import { ShowHideContext } from "../../context/ShowHideProvider";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const { showHideForm, setShowHideForm } = useContext(ShowHideContext);
  const { addToast } = useToasts();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
    }
  }, [accessToken]);

  const handleLogin = async (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: login,
        variables: {
          username: email,
          password,
        },
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res?.data?.login?.accessToken) {
          console.log("data.login.accessToken: ", res.data.login.accessToken);
          setAccessToken(res.data.login.accessToken);
        }
        setShowHideForm({
          ...showHideForm,
          ...{
            isShowRegisterForm: false,
            isShowLoginForm: false,
            isSHowShareForm: false,
            isShowListLink: true,
          },
        });
        addToast("Welcome to movies website", {
          appearance: "success",
          autoDismiss: true,
        });
        window.location.reload();
      });
  };

  return (
    showHideForm.isShowLoginForm && (
      <div class="login">
        <form>
          <label for="chk" aria-hidden="true">
            Login
          </label>
          <input
            value={email}
            type="email"
            name="email"
            placeholder="Email"
            required=""
            onInput={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            required=""
            onInput={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
    )
  );
}

export default memo(Login);
