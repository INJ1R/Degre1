import { addItem } from "../../store/cart.js";
import style from "./Product.module.scss";

export const Product = (props) => {
  const { id, price, name, description, img } = props;

  return (
    <div
      className={style.Product}
      onClick={() => {
        addItem(props);
      }}
      id={id}
    >
      <div className={style.Product__Media}>
        <img src={img} alt={name} />
      </div>
      <div className={style.Product__content}>
        <h4 className={style.Product__title}>{name}</h4>
        <p className={style.Product__ingridients}>{description}</p>
        <div className={style.actions}>
          <button className={style.actions__buy}>Выбрать</button>
          <div className={style.actions__price}>{price}₽</div>
        </div>
      </div>
    </div>
  );
};
