import React, { useState } from "react";

import PostFormView from "./PostFormView";

import PropTypes from "prop-types";

const propTypes = {
  buttonText: PropTypes.string.isRequired,
  requestTrigger: PropTypes.func.isRequired,
};

const PostFormContainer = ({
  buttonText,
  requestTrigger,
  titleInputValue,
  contentInputValue,
  urlImageInputValue,
}) => {
  const [values, setValue] = useState({
    title: titleInputValue,
    content: contentInputValue,
    urlImage: urlImageInputValue,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (event) => {
    setValue({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <PostFormView
        buttonText={buttonText}
        onChange={onChange}
        inputValues={values}
        onSubmit={(event) => {
          event.preventDefault();
          if (values.title && (values.urlImage || values.content)) {
            requestTrigger({ variables: { ...values } });
          } else {
            setErrorMessage("It is necessary a title and a URL Image or a Content");
            setTimeout(() => {
              setErrorMessage("");
            }, 4000);
          }
        }}
        titleInputValue={titleInputValue ?? ""}
        contentInputValue={contentInputValue ?? ""}
        urlImageInputValue={urlImageInputValue ?? ""}
      ></PostFormView>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

PostFormContainer.propTypes = propTypes;

export default PostFormContainer;
