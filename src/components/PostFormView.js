import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const propTypes = {
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  inputValues: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Form = styled.form`
  text-align: center;
  margin-top: 25px;
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  width: 150px;
  font-size: 18px;
`;


const PostFormView = ({
  buttonText,
  onSubmit,
  inputValues,
  onChange,
  titleInputValue,
  contentInputValue,
  urlImageInputValue,
}) => {
  return (
    <Form id="EditAndCreationFormPost" onSubmit={onSubmit}>
      <label htmlFor="title">Title: </label>
      <div>
        <Input
          value={inputValues.title ?? titleInputValue}
          id="title"
          name="title"
          onChange={onChange}
          data-testid="inputTitle"
        />
      </div>
      <label htmlFor="content">Content: </label>
      <div>
        <Input
          value={inputValues.content ?? contentInputValue}
          id="content"
          name="content"
          onChange={onChange}
          data-testid="inputContent"
        />
      </div>
      <label htmlFor="urlImage">URL Image (Optional): </label>
      <div>
        <Input
          value={inputValues.urlImage ?? urlImageInputValue}
          id="urlImage"
          name="urlImage"
          onChange={onChange}
          data-testid="inputUrl"
        />
      </div>
      <Button id="submitButton" type="submit">
        {buttonText}
      </Button>
    </Form>
  );
};

PostFormView.propTypes = propTypes;

export default PostFormView;
