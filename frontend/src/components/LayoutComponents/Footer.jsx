import React from "react";

const Footer = ({trademark}) => {
	return (
		<footer className="flex flex-row justify-between py-12 px-32 bg-[#F0F0F0]">
			
			<div className="flex relative w-2/5">
				<div className="whitespace-nowrap flex flex-row items-center text-base absolute top-1">
					<img src='/footer/logo.png' className="h-8 w-8 mr-2"></img>
					<h1>Hexlet Handmade</h1>
				</div>
				<h1 className="whitespace-nowrap absolute bottom-1">{trademark}</h1>
			</div>

			<div className="flex flex-col w-1/5 pr-8">
				<b className="text-base mb-2">Hexlet Handmade</b>
				<a className="mb-2" href="*">О компании</a>
				<a className="mb-2" href="*">Пользовательское соглашение</a>
				<a className="mb-2" href="*">Условия гарантии</a>
			</div>

			<div className="flex flex-col w-1/5">
				<b className="text-base">Помощь</b>
				<a className="mb-2 mt-2" href="*">Магазин</a>
				<a className="mb-2" href="*">Контакты</a>
				<a className="mb-2" href="*">Поддержка</a>
				<a className="mb-2" href="*">Отследить заказ</a>
			</div>

			<div className="flex flex-col w-1/5">
				<b className="text-base mb-2">Контакты</b>
				<a className="flex flex-row whitespace-nowrap mb-2" href="tel:+79262231011"><img src="footer/phone.png" className="mr-1"></img>+7 (926) 223-10-11</a>
				<a className="flex flex-row whitespace-nowrap mb-2" href="*"><img src="footer/placeSign.png" className="mr-1"></img>Угрешская ул., 14, Москва, 115088</a>
				<a className="flex flex-row mb-2" href="*"><img src="footer/facebookLogo.png" className="mr-1"></img>Facebook</a>
				<a className="flex flex-row mb-2" href="*"><img src="footer/instagramLogo.png" className="mr-1"></img>Instagram</a>
			</div>

		</footer>
	);
};

export default Footer;