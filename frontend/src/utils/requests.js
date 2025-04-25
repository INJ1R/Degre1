import axios from "axios";


const url = 'https://degree-10ur.onrender.com/'

export const selectedItems = url + "selectedItems";

export const getData = async () => {
	const knittedProductsData = (await axios.get(url + "knittedProducts")).data;
	const ceramicsData = (await axios.get(url + "ceramics")).data;
	const jewelryData = (await axios.get(url + "jewelry")).data;
	const decorData = (await axios.get(url + "decor")).data;
	const textilesData = (await axios.get(url + "textiles")).data;
	const soapData = (await axios.get(url + "soap")).data;
	const woodenProductsData = (await axios.get(url + "woodenProducts")).data;
	return {knittedProductsData, ceramicsData, jewelryData, decorData, textilesData, soapData, woodenProductsData};
};