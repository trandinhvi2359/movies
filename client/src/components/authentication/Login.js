import { memo } from "react";

function Login({ isShowLoginModel }) {
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
                <input type="text" name="user" placeholder="Email" />
                <input type="password" name="pass" placeholder="Password" />
                <input
                  type="submit"
                  name="login"
                  class="login loginmodal-submit"
                  value="Login"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default memo(Login);
