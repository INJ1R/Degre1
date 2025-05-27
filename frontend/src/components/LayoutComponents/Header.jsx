import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CitiesSelect from "../CitiesSelect";
import CartComponent from "../CartComponent";
import AutorizationButton from "./AutorizationButton";

export const HeaderComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const showModal = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      message.error('Для доступа к корзине войдите в аккаунт');
      return;
    }
    setIsModalOpen(true);
    setOrderCompleted(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOrderComplete = () => {
    setOrderCompleted(true);
    setTimeout(() => setIsModalOpen(false), 2000);
  };

  return (
    <div className="bg-white top-0 h-20 z-20 w-full">
      <div>
        <div className={`mx-16 h-8 flex flex-row items-center flex-nowrap`}>
          <CitiesSelect />
          <p className="ml-5 hidden sm:block">
            Среднее время доставки: 45 минут
          </p>
        </div>

        <div>
          <div className="border-t-2 w-full mb-2" />
          <div className="mx-20 flex flex-row items-center flex-nowrap">
            <p className="text-black font-bold grow">Hexlet Handmade</p>
            <Button
              onClick={showModal}
              type="text"
              className="bg-orange-400 text-gray-50 hover:bg-orange-400"
              icon={<ShoppingCartOutlined />}
            >
              Корзина
            </Button>
            <AutorizationButton></AutorizationButton>
            <Modal
              title={orderCompleted ? "Заказ оформлен" : "Корзина"}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              {orderCompleted ? (
                <div className="text-center py-4">
                  <p>Ваш заказ успешно оформлен!</p>
                </div>
              ) : (
                <CartComponent onCheckout={handleOrderComplete} />
              )}
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};