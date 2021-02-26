import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Searchbar.scss";
import MLLogo from "../../assets/ml-logo-s.png";

const Searchbar = ({ onsubmit, handleClick }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onsubmit(value);
  };

  const onClick = () => {
    setValue("");
    handleClick();
  };

  return (
    <div className="searchbar-container">
      <form className="searchbar" onSubmit={(e) => handleSubmit(e)}>
        <Link to={"/"} onClick={onClick}>
          <img src={MLLogo} alt="MercadoLibre" />
        </Link>
        <input
          className="searchbar-input"
          type="text"
          onKeyUp={(e) => setValue(e.target.value)}
          placeholder="Nunca dejes de buscar"
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="searchbar-btn" type="submit" />
      </form>
    </div>
  );
};

Searchbar.propTypes = {
  onsubmit: PropTypes.func,
  handleClick: PropTypes.func,
};

export { Searchbar as default };
