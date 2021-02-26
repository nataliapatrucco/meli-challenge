import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import "./Items.scss";
import freeShipping from "../../assets/shipping-s.png";
import { formatCurrency, formatPrice } from "../../utils";

const Items = ({ result }) => {
  return (
    <div className="items-container">
      {result && result.length ? (
        result.map(({ price, title, picture, address, id, free_shipping }) => (
          <Link key={`item_${id}`} to={{ pathname: `/items/${id}` }}>
            <div className="items-search-view">
              <div className="items-info">
                <img
                  className="items-img"
                  src={picture}
                  alt="imagen-producto-ml"
                />
                <div className="items-details">
                  <div className="items-price">
                    <p className="items-currency">
                      {formatCurrency(price.currency)}
                    </p>
                    <p style={{ margin: 0 }}>
                      {formatPrice(price.amount, price.decimals)}
                    </p>
                    {free_shipping && (
                      <img
                        className="free-shipping"
                        alt="free-shipping"
                        src={freeShipping}
                      />
                    )}
                  </div>
                  <p className="items-title">{title}</p>
                </div>
              </div>
              <div className="items-address">
                <p>{address}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <>
          <p>No se encontraron productos, probá buscando algo más.</p>
          <Redirect to={"/"} />
        </>
      )}
    </div>
  );
};

Items.propTypes = {
  result: PropTypes.array,
};

export { Items as default };
