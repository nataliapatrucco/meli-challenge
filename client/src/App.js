import React, { useState } from "react";
import "./App.scss";
import { Route, Switch, useHistory } from "react-router-dom";
import Searchbar from "./components/Searchbar/Searchbar";
import Items from "./components/Items/Items";
import Item from "./components/Item/Item";
import axios from "axios";
import Spinner from "./components/Spinner/Spinner";
import Breadcrums from "./components/Breadcrums/Breadcrums";
import Error from "./components/Error/Error";

const App = () => {
  const [result, setResult] = useState();
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  let history = useHistory();

  axios.defaults.headers = { "Content-Type": "application/json" };

  const reset = () => {
    setError("");
    setCategories("");
    setResult("");
  };

  const searchItems = async (query) => {
    reset();
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/items?q=${query}`
      );
      if (!response.data.items.length) {
        setLoading(false);
        setError(
          "No se encontraron productos, proba buscando con otro nombre."
        );
      } else {
        setResult(response.data.items);
        setCategories(response.data.categories);
        setLoading(false);
        history.push(`/items?search=${query}`);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Searchbar onsubmit={(query) => searchItems(query)} handleClick={reset} />
      {error && <Error errorMessage={error} />}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {categories && <Breadcrums categories={categories} />}
          <Switch>
            <Route exact path="/items">
              <Items result={result} />
            </Route>
            <Route path="/items/:id" component={Item} />
          </Switch>
        </>
      )}
    </div>
  );
};

export { App as default };
