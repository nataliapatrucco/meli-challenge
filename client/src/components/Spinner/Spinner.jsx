import React from "react";
import "./Spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner spinner-dots-scale">
      <div className="spinner-dot" />
      <div className="spinner-dot" />
      <div className="spinner-dot" />
    </div>
  );
};

export { Spinner as default };
