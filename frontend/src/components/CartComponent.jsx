import { Card, Radio, Input, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useStore } from "effector-react";
import { cartStore, removeItem, clearCart } from "../store/cart.js";
import { useState } from "react";
import axios from "axios";

const CartComponent = ({ onCheckout }) => {
  const items = useStore(cartStore);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isCheckout, setIsCheckout] = useState(false);

  const totalPrice = () => {
    return items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  };

  const handleCheckout = async () => {
    if (!isCheckout) {
      setIsCheckout(true);
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_API_URL + "create-order", {
        items,
        paymentMethod,
        address,
        phone,
        name,
        total: totalPrice()
      });
      
      clearCart();
      onCheckout();
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  return (
    <>
      {!isCheckout ? (
        <div>
          {items.length === 0 && <div>Тут пока пусто</div>}
          {items.map((el) => (
            <Card key={el.id} className="flex mb-2 h-32 relative py-3.5">
              <img className="w-24 absolute left-2 top-2" src={el.image} alt="none" />
              <div className="pl-2 absolute left-28 top-5 font-bold">
                {el.name} (x{el.quantity})
              </div>
              <div className="absolute bottom-3 right-5 font-bold">
                {el.price * el.quantity} ₽
              </div>
              <button
                className="absolute top-2 right-5"
                onClick={() => removeItem(el.id)}
              >
                <CloseOutlined />
              </button>
            </Card>
          ))}
          {items.length > 0 && (
            <div className="border-t-2 mt-7 relative">
              <span className="font-bold left-0 absolute mt-2">
                Сумма заказа {totalPrice()} ₽
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-bold">Способ оплаты</label>
            <Radio.Group 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              value={paymentMethod}
            >
              <Radio value="card">Картой при получении</Radio>
              <Radio value="cash">Наличными при получении</Radio>
            </Radio.Group>
          </div>

          <div>
            <label className="block mb-2 font-bold">Адрес доставки</label>
            <Input 
              placeholder="Введите адрес доставки" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-bold">Телефон</label>
            <Input 
              placeholder="Введите ваш телефон" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-bold">Имя</label>
            <Input 
              placeholder="Введите ваше имя" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-4">
          <Button 
            type="primary" 
            className="bg-orange-400 w-full mt-4" 
            onClick={handleCheckout}
          >
            {isCheckout ? "Подтвердить заказ" : "Перейти к оформлению"}
          </Button>
        </div>
      )}
    </>
  );
};

export default CartComponent;