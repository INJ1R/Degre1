import axios from "axios";

export const selectedItems = "http://localhost:3000/selectedItems";

export const getData = async () => {
	const knittedProductsData = (await axios.get("http://localhost:3000/knittedProducts")).data;
	const ceramicsData = (await axios.get("http://localhost:3000/ceramics")).data;
	const jewelryData = (await axios.get("http://localhost:3000/jewelry")).data;
	const decorData = (await axios.get("http://localhost:3000/decor")).data;
	const textilesData = (await axios.get("http://localhost:3000/textiles")).data;
	const soapData = (await axios.get("http://localhost:3000/soap")).data;
	const woodenProductsData = (await axios.get("http://localhost:3000/woodenProducts")).data;
	return {knittedProductsData, ceramicsData, jewelryData, decorData, textilesData, soapData, woodenProductsData};
};