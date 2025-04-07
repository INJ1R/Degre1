import React, { useEffect, useState, useRef } from "react";
import { getData } from "utils/requests";
import { ItemsGroup } from "../ItemsGroup/ItemsGroup";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NavGen } from "components/NavGen";

export const BodyComponent = () => {
	const [windowSize, setWindowSize] = useState(innerWidth);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setWindowSize(innerWidth);
		});
	}, []);

	const pizzaRef = useRef(null);
	const sushiRef = useRef(null);
	const drinksRef = useRef(null);
	const comboRef = useRef(null);
	const snackRef = useRef(null);
	const dessertRef = useRef(null);
	const sauceRef = useRef(null);

	const navLinks = [
		{
			name: "Пиццы",
			icon: "/nav/pizza.jpg",
			ref: pizzaRef,
		},
		{
			name: "Суши",
			icon: "/nav/sushi.jpg",
			ref: sushiRef,
		},
		{
			name: "Напитки",
			icon: "/nav/drink.jpg",
			ref: drinksRef,
		},
		{
			name: "Снэки",
			icon: "/nav/snack.jpg",
			ref: snackRef,
		},
		{
			name: "Комбо",
			icon: "/nav/combo.jpg",
			ref: comboRef,
		},
		{
			name: "Десерты",
			icon: "/nav/dessert.jpg",
			ref: dessertRef,
		},
		{
			name: "Соусы",
			icon: "/nav/sauce.jpg",
			ref: sauceRef,
		},
	];

	const linksCoun = navLinks.length;
	const itemLength = 128;
	const containerWidth = windowSize >= 1300 ? 1300 : windowSize;
	const calcSpaceBetween = containerWidth / linksCoun - itemLength;
	const spaceBetween = calcSpaceBetween > 12 ? calcSpaceBetween : 12;

	const [pizzas, setPizzasItem] = useState([]);
	const [sushi, setSushiItem] = useState([]);
	const [drinks, setDrinksItem] = useState([]);
	const [snacks, setSnacksItem] = useState([]);
	const [combo, setComboItem] = useState([]);
	const [desserts, setDessertsItem] = useState([]);
	const [sauces, setSaucesItem] = useState([]);

	useEffect(() => {
		getData().then((e) => {
			setPizzasItem(e.pizzasData);
			setSaucesItem(e.saucesData);
			setSushiItem(e.sushiData);
			setDessertsItem(e.dessertsData);
			setComboItem(e.comboData);
			setDrinksItem(e.drinksData);
			setSnacksItem(e.snacksData);
		});
	}, []);

	return (
		<div>
			<div className="max-w-[1300px] px-[15px] box-border mx-auto">
				<div className="flex flex-col gap-8 py-8">
					<div>
						<Swiper slidesPerView={"auto"} spaceBetween={spaceBetween}>
							<SwiperSlide style={{ width: "min-content" }}>
								<NavGen name="Пиццы" icon="/nav/pizza.jpg" ref={pizzaRef} />
							</SwiperSlide>
							<SwiperSlide style={{ width: "min-content" }}>
								<NavGen name="Суши" icon="/nav/sushi.jpg" ref={sushiRef} />
							</SwiperSlide>
							<SwiperSlide style={{ width: "min-content" }}>
								<NavGen name="Напитки" icon="/nav/drink.jpg" ref={drinksRef} />
							</SwiperSlide>
							<SwiperSlide style={{ width: "min-content" }}>
								<NavGen name="Комбо" icon="/nav/combo.jpg" ref={comboRef} />
							</SwiperSlide>
							<SwiperSlide style={{ width: "min-content" }}>
								<NavGen
									name="Десерты"
									icon="/nav/dessert.jpg"
									ref={dessertRef}
								/>
							</SwiperSlide>
							<SwiperSlide style={{ width: "min-content" }}>
								<NavGen name="Соусы" icon="/nav/sauce.jpg" ref={sauceRef} />
							</SwiperSlide>
							<SwiperSlide style={{ width: "min-content" }}>
								<NavGen name="Снэки" icon="/nav/snack.jpg" ref={snackRef} />
							</SwiperSlide>
						</Swiper>
					</div>
					<div className="flex flex-col gap-12 ">
						<ItemsGroup items={pizzas} title={"Пиццы"} ref={pizzaRef} />

						<ItemsGroup items={sushi} title={"Суши"} ref={sushiRef} />

						<ItemsGroup items={drinks} title={"Напитки"} ref={drinksRef} />

						<ItemsGroup items={snacks} title={"Снэки"} ref={snackRef} />

						<ItemsGroup items={combo} title={"Комбо"} ref={comboRef} />

						<ItemsGroup items={desserts} title={"Десерты"} ref={dessertRef} />

						<ItemsGroup items={sauces} title={"Соусы"} ref={sauceRef} />
					</div>
				</div>
			</div>
		</div>
	);
};
