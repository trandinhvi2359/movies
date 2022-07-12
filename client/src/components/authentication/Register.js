import { memo, useState, useContext } from "react";
import { useMutation } from "react-apollo";
import { useToasts } from "react-toast-notifications";

import { register } from "../../graphql/mutation/authentication";
import { ShowHideContext } from "../../context/ShowHideProvider";

function Register() {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { showHideForm, setShowHideForm } = useContext(ShowHideContext);
  const { addToast } = useToasts();

  const [handleRegister] = useMutation(register, {
    variables: {
      registerInput: {
        name,
        username,
        password,
      },
    },
  });

  const onRegister = (event) => {
    event.preventDefault();
    try {
      handleRegister();
      setShowHideForm({
        isShowRegisterForm: false,
        isShowLoginForm: true,
        isSHowShareForm: false,
        isShowListLink: false,
      });
      addToast("Register a new account successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      addToast("Register a new account fail", {
        appearance: "error",
        autoDismiss: true,
      });
      console.log("[Register]", error);
    }
  };

  return (
    showHideForm.isShowRegisterForm && (
      <div class="signup">
        <form>
          <label for="chk" aria-hidden="true">
            Sign up
          </label>
          <input
            type="text"
            value={name}
            name="txt"
            placeholder="Username"
            required=""
            onInput={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            value={username}
            name="email"
            placeholder="Email"
            required=""
            onInput={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            required=""
            value={password}
            onInput={(e) => setPassword(e.target.value)}
          />
          <button onClick={onRegister}>Sign up</button>
        </form>
      </div>
    )
  );
}

export default memo(Register);
