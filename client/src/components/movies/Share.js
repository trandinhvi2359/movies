import { memo, useState } from "react";
import { useMutation } from "react-apollo";
import PropTypes from "prop-types";

import { addLink } from "../../graphql/mutation/link";

function Share({ isShowShareModel, handleSetIsShowShareModel }) {
  const [link, setLink] = useState(null);

  const [handleAddLink] = useMutation(addLink, {
    variables: {
      addLinkInput: {
        link,
      },
    },
  });

  const handleShareLink = () => {
    try {
      handleAddLink();
      handleSetIsShowShareModel(false);
    } catch (error) {
      console.log("[Share a link]", error);
    }
  };

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
                  size="20"
                  placeholder="Enter link to share"
                  value={link}
                  onInput={(e) => setLink(e.target.value)}
                />
                <input
                  type="submit"
                  name="share"
                  class="share loginmodal-submit"
                  value="Share"
                  onClick={handleShareLink}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

Share.propTypes = {
  isShowShareModel: PropTypes.bool.isRequired,
  handleSetIsShowShareModel: PropTypes.func.isRequired,
};

export default memo(Share);
