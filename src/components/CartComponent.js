import { useState } from "react";
import { Card } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useStore } from "effector-react";
import { cartStore, removeItem } from "store/cart";

const CartComponent = () => {
	const items = useStore(cartStore);
	const [values, setValues] = useState([]);
	const empty = values.length < 1;

	const totalPrice = () => {
		const total = values.reduce((acc, curr) => {
			return acc + curr.price;
		}, 0);
		return total;
	};

	return (
		<>
			<div className="">
				{empty ? <div>Тут пока пусто</div> : null}
				{items.map((el) => {
					return (
						<Card
							key={el.id}
							id={el.id}
							className="flex mb-2 h-32 relative py-3.5"
						>
							<img
								className="w-24 absolute left-2 top-2"
								src={el.img}
								alt="none"
							/>
							<div className="pl-2 absolute left-28 top-5 font-bold">
								{el.name}
							</div>
							<div className="absolute bottom-3 right-5 font-bold">
								{el.price} ₽
							</div>
							<button
								className="absolute top-2 right-5"
								onClick={() => removeItem(el.id)}
							>
								<CloseOutlined />
							</button>
						</Card>
					);
				})}
				{!empty ? (
					<div className="border-t-2 mt-7 relative">
						<span className="font-bold left-0 absolute mt-2">
              Сумма заказа {totalPrice()} ₽
						</span>
					</div>
				) : null}
			</div>
		</>
	);
};

export default CartComponent;
