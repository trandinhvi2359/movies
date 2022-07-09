import { memo, useState } from "react";
import { useMutation } from "react-apollo";
import PropTypes from "prop-types";

import { register } from "../../graphql/mutation/authentication";

function Register({ isShowRegisterModel, handleSetIsShowRegisterModel }) {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const [handleRegister] = useMutation(register, {
    variables: {
      registerInput: {
        name,
        username,
        password,
      },
    },
  });

  const onRegister = () => {
    try {
      handleRegister();
      handleSetIsShowRegisterModel(false);
    } catch (error) {
      console.log("[Register]", error);
    }
  };

  return (
    isShowRegisterModel && (
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
                  value={name}
                  placeholder="Name"
                  size="12"
                  onInput={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  name="user"
                  value={username}
                  size="12"
                  placeholder="Username"
                  onInput={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  name="pass"
                  value={password}
                  placeholder="Password"
                  size="12"
                  onInput={(e) => setPassword(e.target.value)}
                />
                <input
                  type="submit"
                  name="login"
                  class="login loginmodal-submit"
                  value="Register"
                  onClick={onRegister}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

Register.propTypes = {
  isShowRegisterModel: PropTypes.bool.isRequired,
  handleSetIsShowRegisterModel: PropTypes.func.isRequired,
};

export default memo(Register);
