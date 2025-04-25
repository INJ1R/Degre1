import { addItem } from "../../store/cart.js";
import style from "./Product.module.scss";

export const Product = (props) => {
	const { id, price, name, ingridients, img } = props;
	return (
		<div
			className={style.Product}
			onClick={() => {
				addItem(props);
			}}
		>
			<div className={style.Product__Media}>
				<img src={img} />
			</div>
			<div className={style.Product__content}>
				<h4 className={style.Product__title}>{name}</h4>
				<p className={style.Product__ingridients}>{ingridients}</p>
				<div className={style.actions}>
					<button className={style.actions__buy}>Выбрать</button>
					<div className={style.actions__price}>{price}₽</div>
				</div>
			</div>
		</div>
	);
};
