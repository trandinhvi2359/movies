import { memo, useState, useContext } from "react";
import { useMutation } from "react-apollo";
import PropTypes from "prop-types";
import { useToasts } from "react-toast-notifications";

import { ShowHideContext } from "../../context/ShowHideProvider";
import { addLink } from "../../graphql/mutation/link";

function Share() {
  const [link, setLink] = useState(null);
  const { showHideForm } = useContext(ShowHideContext);
  const { addToast } = useToasts();

  const [handleAddLink] = useMutation(addLink, {
    variables: {
      addLinkInput: {
        link,
      },
    },
  });

  const handleShareLink = (event) => {
    event.preventDefault();
    try {
      handleAddLink();
      setLink("");
      addToast("Shared a movie successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      addToast("Shared a movie fail", {
        appearance: "error",
        autoDismiss: true,
      });
      console.log("[Share a movie]", error);
    }
  };

  return (
    showHideForm.isSHowShareForm && (
      <div class="login">
        <form>
          <label for="chk" aria-hidden="true">
            Share
          </label>
          <input
            value={link}
            type="text"
            name="link"
            placeholder="Enter link to share"
            value={link}
            required=""
            onInput={(e) => setLink(e.target.value)}
          />
          <button onClick={handleShareLink}>Share</button>
        </form>
      </div>
    )
  );
}

export default memo(Share);
