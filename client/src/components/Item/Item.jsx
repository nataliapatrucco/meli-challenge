import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Item.scss";
import axios from "axios";
import { formatCurrency, formatPrice } from "../../utils";

const Item = (props) => {
  const [item, setItem] = useState({});
  const id = props.match.params.id;

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/items/${id}`);
      setItem(response.data.item);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="item-container">
      {item && Object.keys(item).length !== 0 && (
        <div className="single-item-view">
          <div className="top-card">
            <img
              className="item-picture"
              src={item.picture}
              alt={`mercadolibre_${item.title}`}
            />

            <div className="item-data">
              <div className="condition">
                <p>{`${item.condition === "new" ? "Nuevo" : "Usado"} - ${
                  item.sold_quantity
                } vendidos `}</p>
              </div>
              <p className="item-title">{item.title}</p>
              <div className="price">
                <p className="item-currency">
                  {formatCurrency(item.price.currency)}
                </p>
                <p style={{ margin: 0 }}>
                  {formatPrice(item.price.amount, item.price.decimals)}
                </p>
              </div>
              <button className="btn-compra">Comprar</button>
            </div>
          </div>
          <div className="item-description">
            <h4 className="description-title">Descripción del producto</h4>
            <p className="description">{item.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

Item.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export { Item as default };
