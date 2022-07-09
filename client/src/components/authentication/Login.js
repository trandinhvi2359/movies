import { memo, useState, useEffect } from "react";
import { useQuery } from "react-apollo";
import PropTypes from "prop-types";

import { login } from "../../graphql/query/authentication";

function Login({
  isShowLoginModel,
  handleSetIsReload,
  handleSetIsShowLoginModel,
}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
    }
  }, [accessToken]);

  const handleLogin = async () => {
    await refetch();
    if (data?.login?.accessToken) {
      setAccessToken(data.login.accessToken);
    }
    handleSetIsReload();
    handleSetIsShowLoginModel(false);
  };

  const { data, refetch } = useQuery(
    login,
    {
      variables: {
        username: email,
        password,
      },
    },
    { enabled: false }
  );

  return (
    isShowLoginModel && (
      <div>
        <div
          class="modal fade"
          id="login-modal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="loginmodal-container">
              <div>
                <input
                  type="text"
                  name="user"
                  value={email}
                  placeholder="Email"
                  onInput={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  name="pass"
                  value={password}
                  placeholder="Password"
                  onInput={(e) => setPassword(e.target.value)}
                />
                <input
                  type="submit"
                  name="login"
                  class="login loginmodal-submit"
                  value="Login"
                  onClick={handleLogin}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

Login.propTypes = {
  isShowLoginModel: PropTypes.bool.isRequired,
  handleSetIsReload: PropTypes.func.isRequired,
  handleSetIsShowLoginModel: PropTypes.func.isRequired,
};

export default memo(Login);
