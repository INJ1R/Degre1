import { cartStore, addItem, removeItem, clearCart } from "./cart";

describe("Хранилище корзины (cartStore)", () => {
  // Очищаем корзину перед каждым тестом
  beforeEach(() => {
    clearCart();
  });

  test("Добавление нового товара в пустую корзину", () => {
    const item = { id: 1, name: "Product 1", price: 100 };
    addItem(item);

    // Ожидаем, что в корзине появится товар с quantity = 1
    expect(cartStore.getState()).toEqual([{ ...item, quantity: 1 }]);
  });

  test("Увеличение количества товара, если он уже есть в корзине", () => {
    const item = { id: 1, name: "Product 1", price: 100 };

    // Первое добавление товара
    addItem(item);
    // Второе добавление того же товара
    addItem(item);

    // Ожидаем, что quantity увеличится до 2
    expect(cartStore.getState()).toEqual([{ ...item, quantity: 2 }]);
  });

  test("Уменьшение количества товара, если quantity > 1", () => {
    const item = { id: 1, name: "Product 1", price: 100 };

    // Добавляем товар дважды (quantity = 2)
    addItem(item);
    addItem(item);
    // Уменьшаем количество
    removeItem(item.id);

    // Ожидаем, что quantity уменьшится до 1
    expect(cartStore.getState()).toEqual([{ ...item, quantity: 1 }]);
  });

  test("Удаление товара, если quantity = 1", () => {
    const item = { id: 1, name: "Product 1", price: 100 };

    // Добавляем товар (quantity = 1)
    addItem(item);
    // Пытаемся удалить
    removeItem(item.id);

    // Ожидаем, что корзина станет пустой
    expect(cartStore.getState()).toEqual([]);
  });

  test("Полная очистка корзины", () => {
    const item1 = { id: 1, name: "Product 1", price: 100 };
    const item2 = { id: 2, name: "Product 2", price: 200 };

    // Добавляем два товара
    addItem(item1);
    addItem(item2);
    // Очищаем корзину
    clearCart();

    // Ожидаем пустую корзину
    expect(cartStore.getState()).toEqual([]);
  });

  test("Добавление разных товаров в корзину", () => {
    const item1 = { id: 1, name: "Product 1", price: 100 };
    const item2 = { id: 2, name: "Product 2", price: 200 };

    addItem(item1);
    addItem(item2);

    // Ожидаем оба товара в корзине с quantity = 1
    expect(cartStore.getState()).toEqual([
      { ...item1, quantity: 1 },
      { ...item2, quantity: 1 },
    ]);
  });
});
