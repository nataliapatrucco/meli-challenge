import React from "react";
import PropTypes from 'prop-types';
import "./Breadcrums.scss";

const Breadcrums = ({ categories }) => {
  return (
    <div className='breadcrums-container'>
      <ul className="breadcrums">
        {categories &&
          categories.map((categorie, index) => (
            <li key={index}>{categorie}</li>
          ))}
      </ul>
    </div>
  );
};

Breadcrums.propTypes = {
  categories: PropTypes.array,
};

export default Breadcrums;
