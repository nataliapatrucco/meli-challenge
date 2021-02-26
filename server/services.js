const axios = require("axios");

const baseUrl = "https://api.mercadolibre.com";

getItems = async (query) => {
  const res = await axios
    .get(`${baseUrl}/sites/MLA/search?q=${query}&limit=4`)
    .then((response) => response.data);

  const data = res;

  const author = {
    name: "Natalia",
    lastname: "Patrucco",
  };
  const items = data.results.map((item) => {
    const fullPrice = item.price.toString().split(".");
    const amount = parseInt(fullPrice[0]);
    const decimals = parseInt(fullPrice[1]);

    return {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: amount,
        decimals: decimals,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      address: item.address.state_name,
    };
  });
  const categories =
    data.filters.length && data.filters[0].values
      ? data.filters[0].values[0].path_from_root.map(
          (categorie) => categorie.name
        )
      : [];

  return {
    author,
    categories,
    items,
  };
};

getItem = async (id) => {
  try {
    const dataItem = await axios
      .get(`${baseUrl}/items/${id}`)
      .then((response) => JSON.stringify(response.data));

    const dataDescription = await axios
      .get(`${baseUrl}/items/${id}/description`)
      .then((response) => JSON.stringify(response.data));

    const item = JSON.parse(dataItem);
    const description = JSON.parse(dataDescription);

    const fullPrice = item.price.toString().split(".");
    const amount = parseInt(fullPrice[0]);
    const decimals = parseInt(fullPrice[1]);
    return {
      author: {
        name: "Natalia",
        lastname: "Patrucco",
      },
      item: {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: amount,
          decimals: decimals,
        },
        picture: item.pictures[0].url,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description: description.plain_text,
      },
    };
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getItem,
  getItems,
};
