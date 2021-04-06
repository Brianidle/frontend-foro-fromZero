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
  const [values, setValue] = useState([]);

  const onChange = (event) => {
    setValue({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <PostFormView
      buttonText={buttonText}
      onChange={onChange}
      inputValues={values}
      onSubmit={(event) => {
        event.preventDefault();
        if (values.urlImage || values.content) {
          requestTrigger({ variables: { ...values } });
        } else {
          //activar una notificación para mostrar que notifique que se necesita un content o un urlImage
        }
      }}
      titleInputValue={titleInputValue ?? ""}
      contentInputValue={contentInputValue ?? ""}
      urlImageInputValue={urlImageInputValue ?? ""}
    ></PostFormView>
  );
};

PostFormContainer.propTypes = propTypes;

export default PostFormContainer;
