import { memo } from "react";

function Share({ isShowShareModel }) {
  return (
    isShowShareModel && (
      <div>
        <div
          class="modal fade"
          id="share-modal"
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
                  size="50"
                  placeholder="Enter link to share"
                />
                <input
                  type="submit"
                  name="share"
                  class="share loginmodal-submit"
                  value="Share"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default memo(Share);
