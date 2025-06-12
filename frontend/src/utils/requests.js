import axios from 'axios';

const url = import.meta.env.'https://degree-10ur.onrender.com/';

const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getData = async () => {
  try {
    const [
      knittedProductsData,
      ceramicsData,
      jewelryData,
      decorData,
      textilesData,
      soapData,
      woodenProductsData
    ] = await Promise.all([
      handleRequest(axios.get(url + "knittedProducts")),
      handleRequest(axios.get(url + "ceramics")),
      handleRequest(axios.get(url + "jewelry")),
      handleRequest(axios.get(url + "decor")),
      handleRequest(axios.get(url + "textiles")),
      handleRequest(axios.get(url + "soap")),
      handleRequest(axios.get(url + "woodenProducts"))
    ]);

    return {
      knittedProductsData,
      ceramicsData,
      jewelryData,
      decorData,
      textilesData,
      soapData,
      woodenProductsData
    };
  } catch (error) {
    return {
      knittedProductsData: [],
      ceramicsData: [],
      jewelryData: [],
      decorData: [],
      textilesData: [],
      soapData: [],
      woodenProductsData: []
    };
  }
};

export const selectedItems = url + "selectedItems";
