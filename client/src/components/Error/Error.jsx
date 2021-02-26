import React from "react";
import PropTypes from "prop-types";
import "./Error.scss";

const Error = ({ errorMessage }) => {
  return <p>{errorMessage}</p>;
};

Error.propTypes = {
  errorMessage: PropTypes.string,
};

export { Error as default };
