import axios from "axios";

export const selectedItems = "http://localhost:3000/selectedItems";

export const getData = async () => {
	const pizzasData = (await axios.get("http://localhost:3000/pizza")).data;
	const sushiData = (await axios.get("http://localhost:3000/sushi")).data;
	const drinksData = (await axios.get("http://localhost:3000/drinks")).data;
	const dessertsData = (await axios.get("http://localhost:3000/desserts")).data;
	const comboData = (await axios.get("http://localhost:3000/combo")).data;
	const snacksData = (await axios.get("http://localhost:3000/snacks")).data;
	const saucesData = (await axios.get("http://localhost:3000/sauces")).data;
	return {pizzasData, sushiData, drinksData, dessertsData, comboData, snacksData, saucesData};
};